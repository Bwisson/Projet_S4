<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/resaAtelier.crud.php");

if(isset($_POST['id_resa'])){

    $id_resa = $_POST['id_resa'];

    $updateResaArticle = deleteResaAtelier($conn, $id_resa);
} else {
    $updateResaArticle = "Erreur : POST['id_resa'] non défini";
}

echo $updateResaArticle;
?>
