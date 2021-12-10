<?
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $postContent = file_get_contents('php://input');
    $postData = json_decode($postContent, true);

    $formName = $postData["name"];

    $fieldsHtml = "";
    foreach($postData["fields"] as $field){
        $fieldsHtml = $fieldsHtml."<b>".$field["name"]."</b>: ".$field["value"]."<br/><br/>";
    }

//     $EmailTo = "lead@sk-sapfir.ru";

    $EmailTo = "bucks20007@gmail.com";
    // $EmailTo = "snakevzmail@gmail.com";
    // $EmailTo = "gurievsky@mail.ru";

    $FromName = "sk-sapfir.ru";
    $FromEmail = "mail@sk-sapfir.ru";
    $Header = 'MIME-Version: 1.0' . "\r\n";
    $Header .= 'Content-type: text/html' . "\r\n";
    $Header .= 'From:  ' . $FromName . ' <' . $FromEmail .'>' . " \r\n" .
                'Reply-To: '.  $FromEmail . "\r\n" .
                'X-Mailer: PHP/' . phpversion();		
    $sSubject = "Заявка с сайта";
    $sMessageHtml = "<div>".
        "<h1>".$formName."</h1>".
        $fieldsHtml.
    "<div>";
    mail($EmailTo, $sSubject, $sMessageHtml, $Header);
}
?>