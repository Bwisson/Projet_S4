<?php
session_start();
include("../db/db_connect.php");
include("../crud/article.crud.php");
header("Content-Type: application/json");
$res = deleteArticle($conn, );
if ($res) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}