<?php
include("function_rs_to_table.php");

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
    $sql = "UPDATE `Atelier` SET `id`='$id', `nom`='$nom', `type`='$type' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
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