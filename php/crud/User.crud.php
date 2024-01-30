<?php
function createUser($conn, $login, $mdp, $nom, $prenom, $mail, $admin)
{
    $sql = "INSERT INTO `User` (`login`, `mdp`, `nom`, `prenom`, `mail`, `admin`) VALUES ($login, $mdp, $nom, $prenom, $mail, $admin)";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function deleteUser($conn, $id)
{
    $sql = "DELETE FROM `User` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}
function updateUser($conn, $id, $firstname, $lastname, $mail, $photo, $password, $roles)
{
    $sql = "UPDATE `User` SET `firstname`='$firstname', `lastname`='$lastname', `mail`='$mail', `photo`='$photo', `password`='$password', `roles`='$roles' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function listUser($conn)
{
    $sql = "SELECT * FROM `User`";
    $res = mysqli_query($conn, $sql);
    return rs_to_table($res);
}
function selectUser($conn, $id)
{
    $sql = "SELECT * FROM `User`  WHERE `id` = '$id'";
    $res = mysqli_query($conn, $sql);
    return rs_to_table($res)[0];
}


function rs_to_table($rs)
{
    $tab = [];
    while ($row = mysqli_fetch_assoc($rs)) {
        $tab[] = $row;
    }
    return $tab;
}