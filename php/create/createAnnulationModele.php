<?php
session_start();
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/annulationModele.crud.php");
header("Content-Type: application/json");

if (isset($_POST['id_resa'])) {
    $id_resa = htmlspecialchars($_POST['id_resa']);
    $listAnnulations = listAnnulationModele($conn);
    $id_resa_values = array_column($listAnnulations, 'id_resa');
    $res = createAnnulationModele($conn, $id_resa);
    if ($res) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode("$_POST : non défini")
}