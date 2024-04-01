<?php
session_start();
header("Content-Type: application/json");

if ($_SESSION) {
    $res = true;
} else {
    $res = false;
}

echo json_encode($res);
