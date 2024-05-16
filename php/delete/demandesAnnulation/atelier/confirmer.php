<?php
include("../../../db/db_connect.php");
include("../../../crud/function_rs_to_table.php");
include("../../../crud/annulationAtelier.crud.php");
include("../../../crud/resaAtelier.crud.php");

if(isset($_POST['id'], $_POST['id_resa'])){
    $id = $_POST['id'];
    $id_resa = $_POST['id_resa'];
    $res2 = deleteAnnulationAtelier($conn, $id);
    $res = deleteResaAtelier($conn, $id_resa);
    if ($res && $res2) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode("$_POST : non défini");
}
