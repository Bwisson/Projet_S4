<?php
include("function_rs_to_table.php");
function createArticle($conn, $code_barre, $nom, $categorie, $couleur, $taille)
{
    $sql = "INSERT INTO `Article` VALUES ($code_barre, '$nom', '$categorie', '$couleur', '$taille')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteArticle($conn, $code_barre)
{
    $sql = "DELETE FROM `Article` WHERE `code_barre`=$code_barre";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function updateArticle($conn, $code_barre, $nom, $categorie, $couleur, $taille)
{
    $sql = "UPDATE `Article` SET nom = '$nom', categorie = '$categorie', couleur = '$couleur', taille = '$taille' WHERE code_barre = $code_barre";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function listArticle($conn)
{
    $sql = "SELECT * FROM `Article`";
    $res = mysqli_query($conn, $sql);
    return rs_to_table($res);
}