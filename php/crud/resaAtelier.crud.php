<?php

function createResaAtelier($conn, $id_atelier, $start, $end, $title, $groupId, $color, $constraint, $display) {
    $sql = "INSERT INTO `ResaAtelier` (`id_atelier`, `start`, `end`, `title`, `groupId`, `color`, `constraint`, `display`) VALUES ('$id_atelier', '$start', '$end', '$title', '$groupId', '$color', '$constraint', '$display')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteResaAtelier($conn, $id) {
    $sql = "DELETE FROM `ResaAtelier` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function updateResaAtelier($conn, $id, $id_atelier, $start, $end, $title, $groupId, $color, $constraint, $display) {
    $sql = "UPDATE `ResaAtelier` SET `id_atelier`='$id_atelier', `start`='$start', `end`='$end', `title`='$title', `groupId`='$groupId', `color`='$color', `constraint`='$constraint', `display`='$display' WHERE `id` = $id";
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
    $sql = "SELECT * FROM `ResaAtelier` ra JOIN `Atelier` a ON ra.id_atelier = a.id WHERE id_user = $id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}