<?php
function createResaAtelier($conn, $id_atelier, $start, $end, $title, $groupId, $color, $constrait, $display, $id_user) {
    $sql = "INSERT INTO `ResaAtelier` (`id_atelier`, `start`, `end`, `title`, `groupId`, `color`, `constraint`, `display`, `id_user`) VALUES ('$id_atelier', '$start', '$end', '$title', '$groupId', '$color', '$constrait', '$display', '$id_user')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteResaAtelier($conn, $id) {
    $sql = "DELETE FROM `ResaAtelier` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function updateResaAtelier($conn, $id, $id_article, $start, $end, $id_user) {
    $sql = "UPDATE `ResaAtelier` SET SET `id_article`='$id_article', `start`='$start', `end`='$end' , `id_user`='$id_user' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function listResaAtelier($conn) {
    $sql = "SELECT * FROM `ResaAtelier`";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function listResaAtelierFromUser($conn, $id) {
    $sql = "SELECT ra.id, ra.id_atelier, ra.start, ra.end, a.nom, a.type FROM `ResaAtelier` ra JOIN `Atelier` a ON ra.id_atelier = a.id WHERE id_user = $id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}