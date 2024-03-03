<?php
session_start();
include("../db/db_connect.php");
include("../crud/user.crud.php");
header("Content-Type: application/json");

if (isset($_POST['login'], $_POST['mdp'], $_POST['nom'], $_POST['prenom'], $_POST['mail'], $_POST['admin'])) {
    $login = htmlspecialchars($_POST['login']);
    $mdp = password_hash($_POST['mdp'], PASSWORD_DEFAULT);
    $nom = htmlspecialchars($_POST['nom']);
    $prenom = htmlspecialchars($_POST['prenom']);
    $mail = htmlspecialchars($_POST['mail']);
    $admin = $_POST['admin'];

    $listUserLogin = listUserLogin($conn);
    if (!in_array($login, $listUserLogin, $strict = true)){
        $res = createUser($conn, $login, $mdp, $nom, $prenom, $mail, $admin);
        if ($res) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
    } else {
        echo json_encode("Erreur : login déjà existant");
    }
} else {
    echo json_encode("$_POST : non défini");
}
