<?php
include("function_rs_to_table.php");

function createObjet($conn, $code_barre, $nom, $categorie, $couleur, $taille) {
    $sql = "INSERT INTO `Objet` (`code_barre`, `nom`, `categorie`, `couleur`, `taille`) VALUES ('$code_barre', '$nom', '$categorie', '$couleur', '$taille')";
    $res = mysqli_query($conn, $sql); return $res;
}

function deleteObjet($conn, $id) {
    $sql = "DELETE FROM `Objet` WHERE `id`=$id"; $res = mysqli_query($conn, $sql);
    return $res;
}

function updateObjet($conn, $id,$code_barre, $nom, $categorie, $couleur, $taille) {
    $sql = "UPDATE `Objet` SET `code_barre`='$code_barre', `nom`='$nom', `categorie`='$categorie', `couleur`='$couleur', `taille`='$taille' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function listObjet($conn) {
    $sql = "SELECT * FROM `Objet`";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}
