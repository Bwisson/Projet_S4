<?php
function createAnnulationArticle($conn, $id_resa) {
    $sql = "INSERT INTO `AnnulationArticle` (`id_resaArticle`) VALUES ('$id_resa')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteAnnulationArticle($conn, $id) {
    $sql = "DELETE FROM `AnnulationArticle` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function selectAnnulationArticle($conn, $id){
    $sql = "SELECT * FROM `AnnulationArticle` WHERE id=$id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function listAnnulationArticle($conn)
{
    $sql = "SELECT * FROM `AnnulationArticle`";
    $res = mysqli_query($conn, $sql);
    $rs = null;

    if (mysqli_num_rows($res) != 0) {
        $rs = rs_to_table($res);
    }

    return $rs;
}