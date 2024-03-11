<?php
include("function_rs_to_table.php");

function createModele($conn, $id, $nom, $prenom, $genre, $tarif_horaire) {
    $sql = "INSERT INTO `Modele` (`id`, `nom`, `prenom`, `genre`, `tarif_horaire`) VALUES ('$id', '$nom', '$prenom', '$genre', '$tarif_horaire')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteModele($conn, $id) {
    $sql = "DELETE FROM `Modele` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function updateModele($conn, $id, $nom, $prenom, $genre, $tarif_horaire) {
    $sql = "UPDATE `Modele` SET `id`='$id', `nom`='$nom', `prenom`='$prenom', `genre`='$genre', `tarif_horaire`='$tarif_horaire' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function listModele($conn) {
    $sql = "SELECT * FROM `Modele`"; $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}
