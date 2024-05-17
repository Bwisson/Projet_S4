<?php
include_once ('../connection/connection.php');
include_once ('../crud/function_rs_to_table.php');
include_once ('../crud/article.crud.php');
include_once ('../crud/atelier.crud.php');
include_once ('../crud/modele.crud.php');
include_once ('../crud/resaArticle.crud.php');
include_once ('../crud/resaAtelier.crud.php');
include_once ('../crud/resaModele.crud.php');

if (isset($_POST)){
    $type_objet = $_POST["type_objet"];
    $id_objet = $_POST["id_objet"];

    if($type_objet === "Articles"){
        $res = deleteResaArticleByObjectId($conn, $id_objet);
        if ($res){
            $res = deleteArticle($conn, $id_objet);
            if ($res){
                echo json_encode(true);
            }else{
                echo json_encode(false);
            }
        }
    }elseif ($type_objet === "Ateliers"){
        $res = deleteResaAtelierByObjectId($conn, $id_objet);
        if ($res){
            $res = deleteAtelier($conn, $id_objet);
            if ($res){
                echo json_encode(true);
            }else{
                echo json_encode(false);
            }
        }
    }elseif ($type_objet === "Modeles"){
        $res = deleteResaModeleByObjectId($conn, $id_objet);
        if ($res){
            $res = deleteModele($conn, $id_objet);
            if ($res){
                echo json_encode(true);
            }else{
                echo json_encode(false);
            }
        }
    }else{
        echo json_encode("Erreur : type objet undef");
    }
}else{
    echo json_encode("Erreur : POST undef");
}