<?php
include_once ("../db/db_connect.php");
include_once ("../crud/function_rs_to_table.php");
include_once ("../crud/annulationArticle.crud.php");
include_once ("../crud/annulationAtelier.crud.php");
include_once ("../crud/annulationModele.crud.php");

function getListAnnulationUser($conn, $post){
    if(isset($post['id'])){
        $id_user = $post['id'];

        $listAnnulationArticle = listAnnulationArticleUser($conn,$id_user);
        $listAnnulationAtelier = listAnnulationAtelierUser($conn, $id_user);
        $listAnnulationModele = listAnnulationModeleUser($conn, $id_user);
        $listAnnulations = array(
            "annulationArticles" => $listAnnulationArticle,
            "annulationAteliers" => $listAnnulationAtelier,
            "annulationModeles" => $listAnnulationModele,
        );

        $res = $listAnnulations;

    }else{
        $res = "Erreur : POST['id'] non défini";
    }

    return $res;
}

echo json_encode(getListAnnulationUser($conn, $_POST));