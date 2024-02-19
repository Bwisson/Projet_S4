<?php
include("function_rs_to_table.php");
include("pdo_connect.php");
function createUser($conn, $login, $mdp, $nom, $prenom, $mail, $admin)
{
    try {
        $sql = "INSERT INTO `User` (`login`, `mdp`, `nom`, `prenom`, `mail`, `admin`) VALUES (:login, :mdp, :nom, :prenom, :mail, :admin)";
        $sth = $base->prepare($sql);

        $sth -> bindParam(`:login`,$login);
        $sth -> bindParam(`:mdp`,$mdp);
        $sth -> bindParam(`:nom`,$nom);
        $sth -> bindParam(`:prenom`,$prenom);
        $sth -> bindParam(`:mail`,$mail);
        $sth -> bindParam(`:admin`,$admin);

        $res = $sth -> execute();
    } catch  {
        echo("Error :".$e->getMessage());
    }
    
}
function deleteUser($conn, $id)
{
    try{
        $sql = "DELETE FROM `User` WHERE `id`=:id";
        $sth = $base -> prepare($sql);

        $sth -> bindParam(`:id`,$id);

        $res = $sth -> execute();
    }catch{
        echo("Error :".$e->getMessage());
    }
}

function updateUser($conn, $id, $login, $mdp, $nom, $prenom, $mail, $admin)
{
    try{
        $sql = "UPDATE `User` SET `login,`=':login', `mdp`=':mdp', `nom`=':nom', `prenom`=':prenom', `prenom`=':prenom', `mail`=':mail', `admin`=:admin WHERE `id` = :id";
        $sth = $base->prepare($sql);

        $sth -> bindParam(`:login`,$login);
        $sth -> bindParam(`:mdp`,$mdp);
        $sth -> bindParam(`:nom`,$nom);
        $sth -> bindParam(`:prenom`,$prenom);
        $sth -> bindParam(`:mail`,$mail);
        $sth -> bindParam(`:admin`,$admin);

        $res = $sth -> execute();
    }catch{
        echo("Error :".$e->getMessage())
    }
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
    $res_table = null;

    if (mysqli_num_rows($res) > 0){
        $res_table = rs_to_table($res)[0];
    }
    return $res_table;
}



