<?php

//echo "GET Array:\n";
//print_r($_GET);
//echo "POST Array:\n";
//print_r($_POST);

$cookie_name = "lastVisit";
setcookie($cookie_name, date("G:i:s - m/d/y"));

require './mustache.php-2.13.0/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();
$template  = file_get_contents("./templates/beispiel.tpl.html");
$mustache = new Mustache_Engine();

$cookie = "";
if (isset($_COOKIE[$cookie_name])) {
    $cookie = "Du hast die Seite zuletzt um " . $_COOKIE[$cookie_name] . " besucht.";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') { // evtl. geht auch: if(empty($_GET))
    $temp = $_POST;
    if($status=filter_input(INPUT_POST,'status',FILTER_SANITIZE_FULL_SPECIAL_CHARS)){
        $temp['status'] = $status;
    }
    if($mail=filter_input(INPUT_POST,'mail',FILTER_VALIDATE_EMAIL)){
        $temp['mail'] = $mail;
    }
}else{
    $temp = $_GET;
}

echo $mustache->render($template, array('title' => "WebEng-PHP",
                                 'cookie' => $cookie,
                                 'mail' => $temp['mail'],
                                 'password' => $temp['password'],
                                 'status' => $temp['status']
                                 ));


////Achtung nur machen wenn Passwörter angezeigt werden sollen:
////(Also nie! ;-P)
//if($password=filter_input(INPUT_POST,'password',FILTER_SANITIZE_FULL_SPECIAL_CHARS)){
//    echo("<li>Password: $password</li>");
//}
//?>

<!--sehr kurze Lösung:-->
<!---->
<!--setcookie("cookie",date("H:i:s"));-->
<!--require './mustache.php-2.13.0/src/Mustache/Autoloader.php';-->
<!--Mustache_Autoloader::register();-->
<!--$template  = file_get_contents("./templates/beispiel.tpl.html");-->
<!--$mustache = new Mustache_Engine();-->
<!--echo $mustache ->render($template, array_merge($_COOKIE,empty($_GET) ? $_POST : $_GET));-->