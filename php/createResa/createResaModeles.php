<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/resaModele.crud.php");

if(isset($_POST['start'])){

    $id_article = $_POST['id_article'];
    $start = $_POST['start'];
    $end = $_POST['end'];
    $id_user = $_POST['id_user'];
    $title = $_POST['title'];
    $groupId = NULL;
    $color = $_POST['color'];
    $constrait = "businessHours";
    $display = NULL;
    $id_user = $_POST['id_user'];
    $id = NULL;

    $updateResaArticle = createResaModele($conn, $id_article, $start, $end, $title, $groupId, $color, $constrait, $display, $id_user); 
} else {
    $updateResaArticle = "Erreur : POST['start'] non défini";
}

echo $updateResaArticle;
?>
