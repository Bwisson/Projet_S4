<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/resaArticle.crud.php");
include("../crud/resaAtelier.crud.php");
include("../crud/resaModele.crud.php");

if(isset($_POST['id'])){
    $id_user = $_POST['id'];

    $listArticles = listResaArticleFromUser($conn, $id_user);
    $listAteliers = listResaAtelierFromUser($conn, $id_user);
    $listModeles = listResaModeleFromUser($conn, $id_user);
    $listObjets = array(
        "articles" => $listArticles,
        "ateliers" => $listAteliers,
        "modeles" => $listModeles,
    );

    $res = json_encode($listObjets);

}else{
    $res = "Erreur : POST['id'] non défini";
}

echo $res;

