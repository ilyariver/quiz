<?php
if (isset ($_POST['phone'])) {
  // $to = "example@gmail.com";
//   $to = "lead@sk-sapfir.ru";
  // $to = "snakevzmail@gmail.com";
  $to = "bucks20007@gmail.com";
  $from = "mail@sk-sapfir.ru";
  // $from = "sk-ermitage.ru";
  // $subject = "Заполнена контактная форма на сайте ".$_SERVER['HTTP_REFERER'];
  // $subject = "Заявка с сайта. ".$_POST['name'].", тел:".$_POST['phone'];
  $subject ="Заявка с сайта - Уже есть смета?";
  // $subject = "Заявка с сайта ".$_POST['name'];
  // $message = "Имя пользователя: ".$_POST['nameFF']."\nEmail пользователя ".$_POST['contactFF']."\nТелефон пользователя ".$_POST['telFF']."\nСообщение: ".$_POST['projectFF']."\n\nАдрес сайта: ".$_SERVER['HTTP_REFERER'];
  // $message = "<h1>Уже есть смета?</h1><b>Имя: </b>".$_POST['name']."<br/>"."<b>Телефон: </b>".$_POST['phone']."\r\n";
  
  $message=$_POST['name']." - ".$_POST['phone']."\r\n";

  $boundary = md5(date('r', time()));
  $filesize = '';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $from . "\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

  $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"
 
--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit
 
$message";
     if(is_uploaded_file($_FILES['fileuser']['tmp_name'])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['fileuser']['tmp_name'])));
         $filename = $_FILES['fileuser']['name'];
         $filetype = $_FILES['fileuser']['type'];
         $filesize = $_FILES['fileuser']['size'];
         $message.="
 
--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"
 
$attachment";
     }
   $message.="
--$boundary--";

    
  // $message = $message."<h1>Уже есть смета?</h1><b>Имя: </b>".$_POST['name']."<br/>"."<b>Телефон: </b>".$_POST['phone'];   
 
  if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
    mail($to, $subject, $message, $headers);
    echo $_POST['name'].', Ваше сообщение отправлено, спасибо!';
  } else {
    echo 'Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.';
  }
}
?>
