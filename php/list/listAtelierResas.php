<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/atelier.crud.php");

if(isset($_POST['id'])){
    $id_object = $_POST['id']; 
    $listAtelierResas = listResaAtelierForObject($conn, $id_object); 
    $res = json_encode($listAtelierResas);
} else {
    $res = "Erreur : POST['id'] non défini";
}

echo $res;
?>
