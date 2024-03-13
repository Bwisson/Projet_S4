<?php
session_start();
include("../db/db_connect.php");
include("../crud/article.crud.php");
header("Content-Type: application/json");

if (isset($_POST['code_barre'], $_POST['nom'], $_POST['categorie'], $_POST['couleur'], $_POST['taille'])) {
    $code_barre = htmlspecialchars($_POST['code_barre']);
    $nom = htmlspecialchars($_POST['nom']);
    $categorie = htmlspecialchars($_POST['categorie']);
    $couleur = htmlspecialchars($_POST['couleur']);
    $taille = htmlspecialchars($_POST['taille']);

    $res = createArticle($conn, $code_barre, $nom, $categorie, $couleur, $taille);
    if ($res) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
    }
    else {
        echo json_encode("$_POST : non défini");
}