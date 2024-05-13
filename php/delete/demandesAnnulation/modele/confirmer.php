<?php
include("../../../db/db_connect.php");
include("../../../crud/function_rs_to_table.php");
include("../../../crud/annulationModele.crud.php");
include("../../../crud/resaModele.crud.php");

if(isset($_POST['id'], $_POST['id_modele'])){
    $id = $_POST['id'];
    $id_modele = $_POST['id_modele'];
    $res = deleteResaModele($conn, $id_modele);
    $res2 = deleteAnnulationModele($conn, $id);
    if ($res && $res2) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode("$_POST : non défini");
}
