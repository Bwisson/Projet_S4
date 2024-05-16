<?php
include('../connection/connection.php');
include('../crud/function_rs_to_table.php');
include('../crud/modele.crud.php');
include('../crud/article.crud.php');
include('../crud/atelier.crud.php');

if (isset($_POST)){
    $type_objet = $_POST["type_objet"];
    $id_objet = $_POST["id_objet"];

    if($type_objet == "article"){
        $res = deleteArticle($conn, $id_objet);
    }elseif ($type_objet == "atelier"){
        $res = deleteAtelier($conn, $id_objet);
    }elseif ($type_objet == "modele"){
        $res = deleteModele($conn, $id_objet);
    }else{
        $res = "Erreur : type objet undef";
    }
}else{
    $res = "Erreur : POST undef";
}
