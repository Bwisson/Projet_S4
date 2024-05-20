<?php
function createAtelier($conn, $nom, $type) {
    $sql = "INSERT INTO `Atelier` (`nom`, `type`) VALUES ('$nom', '$type')";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function deleteAtelier($conn, $id) {
    $sql = "DELETE FROM `Atelier` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function updateAtelier($conn, $id, $nom, $type) {
    $sql = "UPDATE `Atelier` SET `nom`='$nom', `type`='$type' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function selectAtelier($conn, $id){
    $sql = "SELECT * FROM `Atelier` WHERE id=$id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}
function listAtelier($conn) {
    $sql = "SELECT * FROM `Atelier`";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}
function listResaAtelierForObject($conn, $id_object) {
    $sql = "SELECT * FROM `ResaAtelier` WHERE `id_atelier`=$id_object";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}
