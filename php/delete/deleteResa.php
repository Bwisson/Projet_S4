<?php
include_once ('../connection/connection.php');
include_once ('../crud/function_rs_to_table.php');
include_once ('../crud/resaArticle.crud.php');
include_once ('../crud/resaAtelier.crud.php');
include_once ('../crud/resaModele.crud.php');

if (isset($_POST)){
    $id_resa = $_POST["id_resa"];
    $type_objet = $_POST["type_objet"];

    if ($type_objet === "Articles"){
        $res = deleteResaArticle($conn, $id_resa);
    }else if ($type_objet === "Ateliers"){
        $res = deleteResaAtelier($conn, $id_resa);
    }else if ($type_objet === "Modeles"){
        $res = deleteResaModele($conn, $id_resa);
    }else {
        $res = false;
        echo json_encode("Erreur : type objet inconnu au bataillon");
    }
    if ($res){
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
}else{
    echo json_encode("Erreur : POST undef");
}