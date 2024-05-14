<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/resaArticle.crud.php");
include("../list/listUserResas.php");

if(isset($_POST['id_resa'])){

    $id_resa = $_POST['id_resa'];

    $updateResaArticle = deleteResaArticle($conn, $id_resa);
} else {
    $updateResaArticle = "Erreur : POST['start'] non défini";
}

echo $updateResaArticle;
?>


