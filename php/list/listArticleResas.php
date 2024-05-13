<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/article.crud.php");

if(isset($_POST['id'])){
    $id_object = $_POST['id']; 
    $listArticleResas = listResaArticleForObject($conn, $id_object); 
    $res = json_encode($listArticleResas);
} else {
    $res = "Erreur : POST['id'] non défini";
}

echo $res;
?>
