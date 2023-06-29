<?php

class Template{
    private $varCache;
    
    public function __construct(){
        $this->varCache = array();
    }
    
    // speichert key und value in einem Array
    public function assign($key, $value){
        $this->varCache[$key] = $value;
    }
    
    // gibt den ersetzten Inhalt aus
    public function display($file){
        
        if (file_exists($file)) {
            $content = file_get_contents($file);
            foreach ($this->varCache as $key => $value) {
                $content = str_replace('{$' . $key . '}', $value, $content);
            }
            echo $content;
        } else {
            throw new Exception('Datei existiert nicht!');
        }
    }
}
