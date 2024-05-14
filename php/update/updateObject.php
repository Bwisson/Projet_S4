<?php
include('../connection/connection.php');
include('../crud/function_rs_to_table.php');
include('../crud/modele.crud.php');
include('../crud/article.crud.php');
include('../crud/atelier.crud.php');

if (isset($_POST)){
    $type_objet = $_POST["type_objet"];

    if ($type_objet == "article"){
        $id = $_POST["id"];
        $code_barre = htmlspecialchars($_POST["code_barre"]);
        $nom = htmlspecialchars($_POST["nom"]);
        $categorie = htmlspecialchars($_POST["categorie"]);
        $couleur = htmlspecialchars($_POST["couleur"]);
        $taille = htmlspecialchars($_POST["taille"]);

        $res = updateArticle($conn, $id, $code_barre, $nom, $categorie, $couleur, $taille);
    }elseif ($type_objet == "atelier"){
        $id = $_POST["id"];
        $nom = htmlspecialchars($_POST["nom"]);
        $type = htmlspecialchars($_POST["type"]);

        $res = updateAtelier($conn, $id, $nom, $type);
    }elseif ($type_objet == "modele"){
        $id = $_POST["id"];
        $nom = htmlspecialchars($_POST["nom"]);
        $prenom = htmlspecialchars($_POST["prenom"]);
        $genre = htmlspecialchars($_POST["genre"]);
        $tarif_horaire = htmlspecialchars($_POST["tarif_horaire"]);

        $res = updateModele($conn, $id, $nom, $prenom, $genre, $tarif_horaire);
    }else {
        $res = "Erreur : type objet inconnu";
    }
}else {
    $res = "Erreur : POST undef";
}

echo $res;
