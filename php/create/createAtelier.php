<?php
session_start();
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/atelier.crud.php");
header("Content-Type: application/json");

if (isset($_POST['nom'], $_POST['type'])) {
    $nom = htmlspecialchars($_POST['nom']);
    $type = htmlspecialchars($_POST['type']);

    $res = createAtelier($conn, $nom, $type);
    if ($res) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}
else {
    echo json_encode("$_POST : non défini");
}