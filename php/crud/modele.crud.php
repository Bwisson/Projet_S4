<?php
include("function_rs_to_table.php");

function createModele($conn, $nom, $prenom, $genre, $age, $tarif_horaire) {
    $sql = "INSERT INTO `Modele` (`nom`, `prenom`, `genre`, `age`, `tarif_horaire`) VALUES ('$nom', '$prenom', '$genre', $age, $tarif_horaire)";
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

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}
