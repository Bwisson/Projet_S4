<?php
session_start();
include("../db/db_connect.php");
include("../crud/user.crud.php");
include("../crud/function_rs_to_table.php");

header("Content-Type: application/json");

if (isset($_POST['mail'], $_POST['mdp'])) {
    $id_user = $_SESSION["id_user"];
    $row = selectUserById($conn, $id_user);
    $mail = htmlspecialchars($_POST['mail']);
    $mdp = htmlspecialchars($_POST['mdp']);

    if (password_verify($mdp, $row['mdp'])) {
        $res = updateUserMail($conn, $id_user, $mail);
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