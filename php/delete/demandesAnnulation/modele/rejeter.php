<?php
include("../../../db/db_connect.php");
include("../../../crud/function_rs_to_table.php");
include("../../../crud/annulationModele.crud.php");

if(isset($_POST['id'])){
    $id = $_POST['id'];
    $res = deleteAnnulationModele($conn, $id);
    if ($res) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode("$_POST : non défini");
}
