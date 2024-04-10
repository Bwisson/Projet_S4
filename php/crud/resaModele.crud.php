<?php

function createResaModele($conn, $id_modele, $start, $end, $title, $groupId, $color, $constraint, $display) { 
    $sql = "INSERT INTO `ResaModele` (`id_modele`, `start`, `end`, `title`, `groupId`, `color`, `constraint`, `display`) VALUES ('$id_modele', '$start', '$end', '$title', '$groupId', '$color', '$constraint', '$display')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteResaModele($conn, $id) {
    $sql = "DELETE FROM `ResaModele` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function updateResaModele($conn, $id, $id_modele, $start, $end, $title, $groupId, $color, $constraint, $display) {
    $sql = "UPDATE `ResaModele` SET `id_modele`='$id_modele', `start`='$start', `end`='$end', `title`='$title', `groupId`='$groupId', `color`='$color', `constraint`='$constraint', `display`='$display' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function listResaModele($conn) {
    $sql = "SELECT * FROM `ResaModele`";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function listResaModeleFromUser($conn, $id) {
    $sql = "SELECT * FROM `ResaModele` rm JOIN `Modele` m ON rm.id_modele = m.id WHERE id_user = $id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}