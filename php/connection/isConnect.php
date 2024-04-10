<?php
session_start();
header("Content-Type: application/json");

if (isset($_SESSION['login'])) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}
