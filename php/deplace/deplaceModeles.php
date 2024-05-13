<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/resaModeles.crud.php");

if(isset($_POST['id'])){
    $id = $_POST['id']; 
    $id_article = $_POST['id_article'];
    $start = $_POST['start'];
    $end = $_POST['end'];
    $id_user = $_POST['id_user'];
    $updateResaArticle = updateResaModeles($conn, $id, $id_article, $start, $end, $id_user); 
} else {
    $updateResaArticle = "Erreur : POST['id'] non défini";
}

echo $updateResaArticle;
?>
