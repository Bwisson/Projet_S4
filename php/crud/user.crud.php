<?php
include("function_rs_to_table.php");
function createUser($conn, $login, $mdp, $nom, $prenom, $mail, $admin)
{
    $sql = "INSERT INTO `User` (`login`, `mdp`, `nom`, `prenom`, `mail`, `admin`) VALUES ('$login', '$mdp', '$nom', '$prenom', '$mail', $admin)";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function deleteUser($conn, $id)
{
    $sql = "DELETE FROM `User` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function updateUser($conn, $id, $login, $mdp, $nom, $prenom, $mail, $admin)
{
    $sql = "UPDATE `User` SET `login,`='$login', `mdp`='$mdp', `nom`='$nom', `prenom`='$prenom', `prenom`='$prenom', `mail`='$mail', `admin`=$admin WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function listUser($conn)
{
    $sql = "SELECT * FROM `User`";
    $res = mysqli_query($conn, $sql);
    return rs_to_table($res);
}
function listUserLogin($conn)
{
    $sql = "SELECT `login` FROM `User`";
    $res = mysqli_query($conn, $sql);
    return rs_to_table($res);
}

function selectUser($conn, $login)
{
    $sql = "SELECT * FROM `User`  WHERE `login` = '$login'";
    $res = mysqli_query($conn, $sql);
    return rs_to_table($res)[0];
}




