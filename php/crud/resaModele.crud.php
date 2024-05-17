<?php
function createResaModele($conn, $id_modele, $start, $end, $title, $groupId, $color, $constraint, $display, $id_user) { 
    $sql = "INSERT INTO `ResaModele` (`id_modele`, `start`, `end`, `title`, `groupId`, `color`, `constraint`, `display`, `id_user`) VALUES ('$id_modele', '$start', '$end', '$title', '$groupId', '$color', '$constraint', '$display', '$id_user')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteResaModele($conn, $id) {
    $sql = "DELETE FROM `ResaModele` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteResaModeleByObjectId($conn, $id_modele) {
    $sql = "DELETE FROM `ResaModele` WHERE `id_modele`=$id_modele";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function updateResaModele($conn, $id, $id_article, $start, $end, $id_user) {
    $sql = "UPDATE `ResaModele` SET `id_article`='$id_article', `start`='$start', `end`='$end' , `id_user`='$id_user' WHERE `id` = $id";
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
    $sql = "SELECT rm.id, rm.id_modele, rm.start, rm.end, m.nom, m.prenom, m.genre, m.age, m.tarif_horaire FROM `ResaModele` rm JOIN `Modele` m ON rm.id_modele = m.id WHERE id_user = $id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}