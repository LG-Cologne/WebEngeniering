<?php
require './mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();

//print_r($_POST);
//print_r( $_GET);

$template  = file_get_contents("./templates/beispiel.tpl.html");
$mustache = new Mustache_Engine();

echo $mustache ->render($template, array(
    'title' => "WebEng-PHP",
    'mail' => $_REQUEST['mail'],
    'password' => $_REQUEST['password'],
    'status' => $_REQUEST['status']
));

setcookie('lastVisit', date());