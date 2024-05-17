<?php
include_once ('../connection/connection.php');
include_once ('../crud/function_rs_to_table.php');
include_once ('../crud/modele.crud.php');
include_once ('../crud/article.crud.php');
include_once ('../crud/atelier.crud.php');

if (isset($_POST)){
    $type_objet = $_POST["type_objet"];

    if ($type_objet == "Articles"){
        $id = $_POST["id"];
        $code_barre = htmlspecialchars($_POST["code_barre"]);
        $nom = htmlspecialchars($_POST["nom"]);
        $categorie = htmlspecialchars($_POST["categorie"]);
        $couleur = htmlspecialchars($_POST["couleur"]);
        $taille = htmlspecialchars($_POST["taille"]);

        $res = updateArticle($conn, $id, $code_barre, $nom, $categorie, $couleur, $taille);
    }elseif ($type_objet == "Ateliers"){
        $id = $_POST["id"];
        $nom = htmlspecialchars($_POST["nom"]);
        $type = htmlspecialchars($_POST["type"]);

        $res = updateAtelier($conn, $id, $nom, $type);
    }elseif ($type_objet == "Modeles"){
        $id = $_POST["id"];
        $nom = htmlspecialchars($_POST["nom"]);
        $prenom = htmlspecialchars($_POST["prenom"]);
        $genre = htmlspecialchars($_POST["genre"]);
        $age = htmlspecialchars($_POST["age"]);
        $tarif_horaire = htmlspecialchars($_POST["tarif_horaire"]);

        $res = updateModele($conn, $id, $nom, $prenom, $genre, $age, $tarif_horaire);
    }else {
        $res = "Erreur : type objet inconnu";
    }
}else {
    $res = "Erreur : POST undef";
}

echo $res;
