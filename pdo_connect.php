<?php
$login = "info7";
$pass = "E8Z";

try{
    $base = new PDO("mysql:host=localhost;dbname=info7",$login,$pass);
}catch (exception $th){
    die("Erreur : ".$th->getMessage());
}