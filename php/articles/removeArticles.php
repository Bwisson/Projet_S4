<?php
session_start();
include("../db/db_connect.php");
include("../crud/articles.crud.php");
header("Content-Type: application/json");
$res = createArticle($conn, $code_barre, $nom, $categorie, $couleur, $taille);
if ($res) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}