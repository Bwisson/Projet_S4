<?php
session_start();
include("../db/db_connect.php");
include("../crud/modele.crud.php");
header("Content-Type: application/json");

if (isset($_POST['nom'], $_POST['prenom'], $_POST['genre'], $_POST['age'], $_POST['tarif_horaire'])) {
    $nom = htmlspecialchars($_POST['nom']);
    $prenom = htmlspecialchars($_POST['prenom']);
    $genre = htmlspecialchars($_POST['genre']);
    $age = htmlspecialchars($_POST['age']);
    $tarif_horaire = htmlspecialchars($_POST['tarif_horaire']);

    $res = createModele($conn, $nom, $prenom, $genre, $age, $tarif_horaire);
    if ($res) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}
else {
    echo json_encode("$_POST : non défini");
}
