<?php

require 'lib/Template.class.php';
$tpl = new Template();
$tpl->assign('title', 'Willkommen!');
$tpl->assign('body', '<h1>Hallo</h1><p>Wirklich eine tolle Seite!!</p>');

try{
    $tpl->display('templates/beispiel.tpl.html');
}catch(Exception $ex){
    echo $ex->getMessage() . "\n";
}


