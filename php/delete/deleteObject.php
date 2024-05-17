<?php
include_once ('../connection/connection.php');
include_once ('../crud/function_rs_to_table.php');
include_once ('../crud/modele.crud.php');
include_once ('../crud/article.crud.php');
include_once ('../crud/atelier.crud.php');
include_once ('../crud/resaArticle.crud.php');
include_once ('../crud/resaAtelier.crud.php');
include_once ('../crud/resaModele.crud.php');
include_once ('../crud/annulationArticle.crud.php');
include_once ('../crud/annulationAtelier.crud.php');
include_once ('../crud/annulationModele.crud.php');

if (isset($_POST)){
    $type_objet = $_POST["type_objet"];
    $id_objet = $_POST["id_objet"];

    if($type_objet === "Articles"){
        var_dump(listAnnulationArticle($conn));
//        $res = deleteResaArticleByObjectId($conn, $id_objet);
//        $res = deleteArticle($conn, $id_objet);
    }elseif ($type_objet === "Ateliers"){
//        $res = deleteAtelier($conn, $id_objet);
    }elseif ($type_objet === "Modeles"){
//        $res = deleteModele($conn, $id_objet);
    }else{
        $res = "Erreur : type objet undef";
    }
}else{
    $res = "Erreur : POST undef";
}
