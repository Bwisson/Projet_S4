<?php
session_start();
header("Content-Type: application/json");

if ($_SESSION){
    echo json_encode($_SESSION["admin"]);
}else {
    false;
}

