<?php
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

function updateUserMail($conn, $id, $mail)
{
    $sql = "UPDATE `User` SET `mail`='$mail' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function updateUserPassword($conn, $id, $mdp)
{
    $sql = "UPDATE `User` SET `mdp`='$mdp' WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function listUser($conn)
{
    $sql = "SELECT * FROM `User`";
    $res = mysqli_query($conn, $sql);
    return rs_to_table($res);
}
function selectUserByLogin($conn, $login)
{
    $sql = "SELECT * FROM `User`  WHERE `login` = '$login'";
    $res = mysqli_query($conn, $sql);
    $res_table = null;

    if (mysqli_num_rows($res) > 0){
        $res_table = rs_to_table($res)[0];
    }

    return $res_table;
}

function selectUserById($conn, $id)
{
    $sql = "SELECT * FROM `User`  WHERE `id` = $id";
    $res = mysqli_query($conn, $sql);
    $res_table = null;

    if ($res){
        if (mysqli_num_rows($res) > 0){
            $res_table = rs_to_table($res)[0];
        }
    }

    return $res_table;
}



