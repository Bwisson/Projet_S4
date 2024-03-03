<?php
session_start();
include("../db/db_connect.php");

if ($_SESSION['login'] != "") {
    $res = true;
} else {
    $res = false;
}

echo json_encode($res);
