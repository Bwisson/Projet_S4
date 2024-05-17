<?php
function createAnnulationAtelier($conn, $id_resa) {
    $sql = "INSERT INTO `AnnulationAtelier` (`id_resaAtelier`) VALUES ('$id_resa')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteAnnulationAtelier($conn, $id) {
    $sql = "DELETE FROM `AnnulationAtelier` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function selectAnnulationAtelier($conn, $id){
    $sql = "SELECT * FROM `AnnulationAtelier` WHERE id=$id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function listAnnulationAtelier($conn)
{
    $sql = "SELECT a.id AS id, a.id_resaAtelier AS id_resa, r.id_atelier AS id_atelier, r.start AS start, r.end AS end, ate.nom AS nom_atelier, u.nom AS nom_user, u.prenom AS prenom_user FROM `AnnulationAtelier` a JOIN `ResaAtelier` r ON a.id_resaAtelier=r.id JOIN `User` u ON r.id_user=u.id JOIN `Atelier` ate ON r.id_atelier=ate.id WHERE r.end > NOW()";
    $res = mysqli_query($conn, $sql);

    return rs_to_table($res);
}

function listAnnulationAtelierUser($conn, $id)
{
    $sql = "SELECT a.id AS id, a.id_resaAtelier AS id_resa, r.start AS start, r.end AS end, ate.nom AS nom_atelier, u.nom AS nom_user, u.prenom AS prenom_user FROM `AnnulationAtelier` a JOIN `ResaAtelier` r ON a.id_resaAtelier=r.id JOIN `User` u ON r.id_user=u.id JOIN `Atelier` ate ON r.id_atelier=ate.id WHERE r.end > NOW() AND r.id_user=$id";
    $res = mysqli_query($conn, $sql);

    return rs_to_table($res);
}