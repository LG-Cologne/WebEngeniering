<?php
require './mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();

$template = file_get_contents("./templates/beispiel.tpl.html");
$mustache = new Mustache_Engine();
setcookie('lastVisit', date('D, d M Y H:i:s'));

$input = INPUT_GET;
$array = $_GET;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = INPUT_POST;
    $array = $_POST;
}

filter_input($input, 'mail', FILTER_SANITIZE_SPECIAL_CHARS);
filter_input($input, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
filter_input($input, 'status', FILTER_SANITIZE_SPECIAL_CHARS);
if (!filter_input_($input, 'mail', FILTER_VALIDATE_EMAIL)) {
    $array['mail'] = 'Fehlerhaft Mail';
}

echo $mustache->render($template, array(
    'title' => "WebEng-PHP",
    'mail' => $_REQUEST['mail'],
    'password' => $_REQUEST['password'],
    'status' => $_REQUEST['status'],
    'lastVisit' => $_COOKIE["lastVisit"]
));