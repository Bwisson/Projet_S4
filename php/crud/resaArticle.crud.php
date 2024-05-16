<?php
function createResaArticle($conn, $id_article, $start, $end, $title, $groupId, $color, $constrait, $display, $id_user) {
    $sql = "INSERT INTO `ResaArticle` (`id_article`, `start`, `end`, `title`, `groupId`, `color`, `constraint`, `display`, `id_user`) VALUES ('$id_article', '$start', '$end', '$title', '$groupId', '$color', '$constrait', '$display', '$id_user')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteResaArticle($conn, $id) {
    $sql = "DELETE FROM `ResaArticle` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    var_dump($sql);
    return $res;
}

function updateResaArticle($conn, $id, $id_article, $start, $end, $id_user) {
    $sql = "UPDATE `ResaArticle` SET `id_article`='$id_article', `start`='$start', `end`='$end' , `id_user`='$id_user' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function listResaArticle($conn) {
    $sql = "SELECT * FROM `ResaArticle`";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function listResaArticleFromUser($conn, $id) {
    $sql = "SELECT ra.id, ra.id_article, ra.start, ra.end, a.code_barre, a.nom, a.categorie, a.couleur, a.taille FROM `ResaArticle` ra JOIN `Article` a ON ra.id_article = a.id WHERE id_user = $id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}