<?php

session_start();
include("../db/db_connect.php");
include("../crud/user.crud.php");
header("Content-Type: application/json");

if (isset($_POST['login']) && isset($_POST['mdp'])) {
    $mdp = htmlspecialchars($_POST['mdp']);
    $login = htmlspecialchars($_POST['login']);

    $row = selectUser($conn, $login);

    if ($row && password_verify($mdp, $row['mdp'])) {
        $_SESSION["login"] = $row["login"];
        echo json_encode($row);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode(false);
}