<?php
require './mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();

//print_r($_POST);
//print_r( $_GET);

$template  = file_get_contents("./templates/beispiel.tpl.html");
$mustache = new Mustache_Engine();

$METHOD_TYPE = null;

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $METHOD_TYPE = $_GET;
}else if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $METHOD_TYPE = $_POST;
}

echo $mustache ->render($template, array(
    'title' => "WebEng-PHP",
    'mail' => $METHOD_TYPE['mail'],
    'password' => $METHOD_TYPE['password'],
    'status' => $METHOD_TYPE['status']
));