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

function listCurrentResaArticle($conn) {
    $sql = "SELECT * FROM `ResaArticle` WHERE `end` >= NOW()";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}

function listOldResaArticle($conn) {
    $sql = "SELECT * FROM `ResaArticle` WHERE `end` < NOW()";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}

function listCurrentResaArticleFromUser($conn, $id_user) {
    $sql = "SELECT * FROM `Article` a JOIN `ResaArticle` ra ON a.id = ra.id_article WHERE `end` >= NOW() AND ra.id_user = $id_user";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}

function listOldResaArticleFromUser($conn, $id_user) {
    $sql = "SELECT * FROM `Article` a JOIN `ResaArticle` ra ON a.id = ra.id_article  WHERE `end` < NOW() AND ra.id_user = $id_user";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}