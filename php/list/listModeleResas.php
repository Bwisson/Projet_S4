<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/modele.crud.php");

if(isset($_POST['id'])){
    $id_object = $_POST['id']; 
    $listModeleResas = listResaModeleForObject($conn, $id_object); 
    $res = json_encode($listModeleResas);
} else {
    $res = "Erreur : POST['id'] non défini";
}

echo $res;
?>
