<?php
include_once("../db/db_connect.php");
include_once("../crud/function_rs_to_table.php");
include_once("../crud/resaArticle.crud.php");
include_once("../crud/resaAtelier.crud.php");
include_once("../crud/resaModele.crud.php");

function getListResasUser($conn, $post){
    if(isset($post['id'])){
        $id_user = $post['id'];

        $listArticles = listResaArticleFromUser($conn, $id_user);
        $listAteliers = listResaAtelierFromUser($conn, $id_user);
        $listModeles = listResaModeleFromUser($conn, $id_user);
        $listObjets = array(
            "articles" => $listArticles,
            "ateliers" => $listAteliers,
            "modeles" => $listModeles,
        );

        $res = $listObjets;

    }else{
        $res = "Erreur : POST['id'] non défini";
    }

    return $res;
}

echo json_encode(getListResasUser($conn, $_POST));