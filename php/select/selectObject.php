<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/article.crud.php");
include("../crud/atelier.crud.php");
include("../crud/modele.crud.php");

if (isset($_POST['id']) && $_POST['type']){
    $id = $_POST['id'];
    $type = $_POST['type'];

    if ($type == "Chevalets" || $type == "Peinture"){
        $article = selectArticle($conn, $id);
        $res = json_encode($article);

    }elseif ($type == "Ateliers"){
        $atelier = selectAtelier($conn, $id);
        $res = json_encode($atelier);

    }elseif ($type == "Modeles"){
        $modele = selectModele($conn, $id);
        $res = json_encode($modele);
    }else{
        $res = "Erreur : type objet inconnu";
    }

}else{
    $res  = "Erreur : id ou type objet inconnu";
}

echo $res;

