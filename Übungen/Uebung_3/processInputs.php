<?php
require './mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();

//print_r($_POST);
//print_r( $_GET);

$template  = file_get_contents("./templates/beispiel.tpl.html");
$mustache = new Mustache_Engine();

setcookie('lastVisit', date('D, d M Y H:i:s'));

$lastVisit = $_COOKIE["lastVisit"];

echo $mustache ->render($template, array(
    'title' => "WebEng-PHP",
    'mail' => $_REQUEST['mail'],
    'password' => $_REQUEST['password'],
    'status' => $_REQUEST['status'],
    'lastVisit' => $_COOKIE["lastVisit"]
));

