<?php
include("../db/db_connect.php");
include("../crud/user.crud.php");
include("../crud/function_rs_to_table.php");

if (isset($_POST)){
    $id_user = $_POST["id"];
    $login = $_POST["login"];
    $mdp = $_POST["mdp"];
    $nom = $_POST["nom"];
    $prenom = $_POST["prenom"];
    $mail = $_POST["mail"];
    $admin = $_POST["admin"];

    $res = updateUser($conn, $id_user, $login, $mdp, $nom, $prenom, $mail, $admin);
    if ($res){
        echo json_encode(true);
    }else {
        echo json_encode(false);
    }

}else {
    echo "Erreur : POST non défini";
}
