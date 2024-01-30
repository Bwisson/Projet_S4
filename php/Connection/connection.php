<?php

session_start();
include("../db/db_connect.php");
include("../Crud/User.Crud.php");
header("Content-Type: application/json");


if (isset($_POST['login']) && isset($_POST['mdp'])) {
    $password = htmlspecialchars($_POST['mdp']);
    $login = htmlspecialchars($_POST['login']);

    $row = selectUser($conn, $login);
     var_dump($row);
    if ($row && password_verify($password, $row['password'])) {
        $_SESSION["login"] = $row["login"];
        echo json_encode($row);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode(false);
}