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
    $sql = "SELECT * FROM `AnnulationAtelier`";
    $res = mysqli_query($conn, $sql);
    $rs = null;

    if (mysqli_num_rows($res) != 0) {
        $rs = rs_to_table($res);
    }

    return $rs;
}