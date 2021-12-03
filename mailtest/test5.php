<?php 

function send_mail($to, $thm, $html, $path) 

{ 

  $fp = fopen($path,"r"); 

  if (!$fp) 

  { 

    print "Файл $path не может быть прочитан"; 

    exit(); 

  } 

  $file = fread($fp, filesize($path)); 

  fclose($fp); 

  

  $boundary = "--".md5(uniqid(time())); // генерируем разделитель 

  $headers .= "MIME-Version: 1.0\n"; 

  $headers .="Content-Type: multipart/mixed; boundary=\"$boundary\"\n"; 

  $multipart .= "--$boundary\n"; 

  $kod = 'koi8-r'; // или $kod = 'windows-1251'; 

  $multipart .= "Content-Type: text/html; charset=$kod\n"; 

  $multipart .= "Content-Transfer-Encoding: Quot-Printed\n\n"; 

  $multipart .= "$html\n\n"; 



  $message_part = "--$boundary\n"; 

  $message_part .= "Content-Type: application/octet-stream\n"; 

  $message_part .= "Content-Transfer-Encoding: base64\n"; 

  $message_part .= "Content-Disposition: attachment; filename = \"".$path."\"\n\n"; 

  $message_part .= chunk_split(base64_encode($file))."\n"; 

  $multipart .= $message_part."--$boundary--\n"; 



  if(!mail($to, $thm, $multipart, $headers)) 

  { 

    echo "К сожалению, письмо не отправлено"; 

    exit(); 

  } 

} 


if (isset($_POST["sendme"])){

  if(empty($_POST['mail_to'])) exit("Введите адрес получателя"); 

  // проверяем правильности заполнения с помощью регулярного выражения 

  if (!preg_match("/^[0-9a-z_]+@[0-9a-z_^\.]+\.[a-z]{2,3}$/i", $_POST['mail_to'])) 
     exit("Введите адрес в виде somebody@server.com"); 

  $_POST['mail_to'] = htmlspecialchars(stripslashes($_POST['mail_to'])); 

  $_POST['mail_subject'] = htmlspecialchars(stripslashes($_POST['mail_subject'])); 

  $_POST['mail_msg'] = htmlspecialchars(stripslashes($_POST['mail_msg'])); 

  $picture = ""; 

  // Если поле выбора вложения не пустое - закачиваем его на сервер 

  if (!empty($_FILES['mail_file']['tmp_name'])) 

  { 

    // Закачиваем файл 

    $path = $_FILES['mail_file']['name']; 

    if (copy($_FILES['mail_file']['tmp_name'], $path)) $picture = $path; 

  } 

  $thm = $_POST['mail_subject'];

  $msg = $_POST['mail_msg'];

  $mail_to = $_POST['mail_to'];

  // Отправляем почтовое сообщение 

  if(empty($picture)) mail($mail_to, $thm, $msg); 

  else send_mail($mail_to, $thm, $msg, $picture); 

  // Вспомогательная функция для отправки почтового сообщения с вложением 



}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
<form action="" enctype='multipart/form-data' method=post> 



<tr><td width=50%>To:</td><td align=right><input type=text name=mail_to maxlength=32></td></tr> 

<tr><td width=50%>Subject:</td><td align=right><input type=text name=mail_subject maxlength=64></td></tr> 

<tr><td colspan=2>Сообщение:<br><textarea cols=50 rows=8 name=mail_msg></textarea></td> 

<tr><td width=50%>Photo:</td><td align=right><input type=file name=mail_file maxlength=64></td></tr> 

</tr><tr><td colspan=2><input name="sendme" type=submit value='Отправить'></td></tr> 

</form> 

</body>
</html>