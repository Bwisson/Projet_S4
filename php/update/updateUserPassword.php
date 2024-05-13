<?php
session_start();
include("../db/db_connect.php");
include("../crud/user.crud.php");
include("../crud/function_rs_to_table.php");
header("Content-Type: application/json");

if (isset($_POST['oldMdp'], $_POST['newMdp'], $_POST['confirmNewMdp'])) {
    $id_user = $_SESSION["id_user"];
    $row = selectUserById($conn, $id_user);
    $oldMdp = htmlspecialchars($_POST['oldMdp']);
    $newMdp = htmlspecialchars($_POST['newMdp']);
    $confirmNewMdp = htmlspecialchars($_POST['confirmNewMdp']);

    if (password_verify($oldMdp, $row['mdp']) && $newMdp == $confirmNewMdp) {
        $newHashMdp = password_hash($newMdp, PASSWORD_DEFAULT);
        $res = updateUserPassword($conn, $id_user, $newHashMdp);

        if ($res) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
    } else {
        echo json_encode(["mdp" => false]);
    }
    
} else {
    echo json_encode("$_POST : non défini");
}