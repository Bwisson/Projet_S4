<?php
function createAnnulationModele($conn, $id_resa) {
    $sql = "INSERT INTO `AnnulationModele` (`id_resaModele`) VALUES ('$id_resa')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteAnnulationModele($conn, $id) {
    $sql = "DELETE FROM `AnnulationModele` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function selectAnnulationModele($conn, $id){
    $sql = "SELECT * FROM `AnnulationModele` WHERE id=$id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function listAnnulationModele($conn)
{
    $sql = "SELECT a.id AS id, a.id_resa AS id_resa, r.start AS start, r.end AS end, mod.nom AS nom_modele, mod.prenom AS prenom_modele, u.nom AS nom_user, u.prenom AS prenom_user FROM `AnnulationModele` a JOIN `ResaModele` r ON a.id_resa=r.id JOIN `User` u ON r.id_user=u.id JOIN `Modele` mod ON r.id_modele=mod.id";
    $res = mysqli_query($conn, $sql);
    $rs = null;

    if (mysqli_num_rows($res) != 0) {
        $rs = rs_to_table($res);
    }

    return $rs;
}