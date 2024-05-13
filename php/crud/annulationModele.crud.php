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
    $sql = "SELECT * FROM `AnnulationModele`";
    $res = mysqli_query($conn, $sql);
    $rs = null;

    if (mysqli_num_rows($res) != 0) {
        $rs = rs_to_table($res);
    }

    return $rs;
}