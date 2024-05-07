<?php
global $conn;
session_start();
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/user.crud.php");
header("Content-Type: application/json");

if (isset($_POST['login']) && isset($_POST['mdp'])) {
    $mdp = htmlspecialchars($_POST['mdp']);
    $login = htmlspecialchars($_POST['login']);

    $row = selectUserByLogin($conn, $login);

    if ($row){
        if (password_verify($mdp, $row['mdp'])) {
            $_SESSION["id_user"] = $row["id"];
            $_SESSION["login"] = $row["login"];
            $_SESSION["connecte"] = true;
            if ($row["admin"]){
                $_SESSION["admin"] = true;
            }else {
                $_SESSION["admin"] = false;
            }
            echo json_encode($_SESSION);
        }else {
            echo json_encode(["login" => true, "mdp" => false]);
        }
    } else {
        echo json_encode(["login" => false, "mdp" => true]);
    }
}else{
    echo json_encode(false);
}