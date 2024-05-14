<?php
include("../../../db/db_connect.php");
include("../../../crud/function_rs_to_table.php");
include("../../../crud/annulationModele.crud.php");
include("../../../crud/resaModele.crud.php");

if(isset($_POST['id'], $_POST['id_resa'])){
    $id = $_POST['id'];
    $id_resa = $_POST['id_resa'];
    $res2 = deleteAnnulationModele($conn, $id);
    $res = deleteResaModele($conn, $id_resa);
    if ($res && $res2) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode("$_POST : non défini");
}
