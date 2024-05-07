<?php
function createArticle($conn, $code_barre, $nom, $categorie, $couleur, $taille) {
    $sql = "INSERT INTO `Article` (`code_barre`, `nom`, `categorie`, `couleur`, `taille`) VALUES ('$code_barre', '$nom', '$categorie', '$couleur', '$taille')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteArticle($conn, $id) {
    $sql = "DELETE FROM `Article` WHERE `id`=$id"; $res = mysqli_query($conn, $sql);
    return $res;
}

function updateArticle($conn, $id, $code_barre, $nom, $categorie, $couleur, $taille) {
    $sql = "UPDATE `Article` SET `code_barre`='$code_barre', `nom`='$nom', `categorie`='$categorie', `couleur`='$couleur', `taille`='$taille' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function selectArticle($conn, $id){
    $sql = "SELECT * FROM `Article` WHERE id=$id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function selectArticleCat($conn, $cat){
    $sql = "SELECT * FROM `Article` WHERE `categorie`='$cat'";
    $res = mysqli_query($conn, $sql);
    $rs = null;

    if (mysqli_num_rows($res) != 0){
        $rs = rs_to_table($res);
    }

    return $rs;
}
function listArticle($conn)
{
    $sql = "SELECT * FROM `Article`";
    $res = mysqli_query($conn, $sql);
    $rs = null;

    if (mysqli_num_rows($res) != 0) {
        $rs = rs_to_table($res);
    }

    return $rs;
}
