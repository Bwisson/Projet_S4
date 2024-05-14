<?php
include_once ("../db/db_connect.php");
include_once ("../crud/function_rs_to_table.php");
include_once ("../crud/resaArticle.crud.php");

if(isset($_POST['id_resa'])){

    $id_resa = $_POST['id_resa'];

    $updateResaArticle = deleteResaArticle($conn, $id_resa);
} else {
    $updateResaArticle = "Erreur : POST['start'] non défini";
}

echo $updateResaArticle;
?>


