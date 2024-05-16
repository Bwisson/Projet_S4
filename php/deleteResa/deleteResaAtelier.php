<?php
include_once ("../db/db_connect.php");
include_once ("../crud/function_rs_to_table.php");
include_once ("../crud/resaAtelier.crud.php");

if(isset($_POST['id_resa'])){

    $id_resa = $_POST['id_resa'];

    $updateResaArticle = deleteResaAtelier($conn, $id_resa);
} else {
    $updateResaArticle = "Erreur : POST['id_resa'] non défini";
}

echo $updateResaArticle;
?>
