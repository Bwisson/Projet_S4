<?php
include("function_rs_to_table.php");

function createResaArticle($conn, $id_article, $start, $end, $id_user) {
    $sql = "INSERT INTO `ResaArticle` (`id_article`, `start`, `end`, `id_user`) VALUES ('$id_article', '$start', '$end', '$id_user')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteResaArticle($conn, $id) {
    $sql = "DELETE FROM `ResaArticle` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
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
    $sql = "SELECT * FROM `ResaArticle` ra JOIN `Article` a ON ra.id_article = a.id WHERE id_user = $id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}