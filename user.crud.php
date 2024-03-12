<?php

function createUser($base, $login, $mdp, $nom, $prenom, $mail, $admin)
{
    try {
        $sql = "INSERT INTO `User` (`login`, `mdp`, `nom`, `prenom`, `mail`, `admin`) VALUES (:login, :mdp, :nom, :prenom, :mail, :admin)";
        $sth = $base->prepare($sql);

        $sth -> bindParam(':login',$login);
        $sth -> bindParam(':mdp',$mdp);
        $sth -> bindParam(':nom',$nom);
        $sth -> bindParam(':prenom',$prenom);
        $sth -> bindParam(':mail',$mail);
        $sth -> bindParam(':admin',$admin);

        $res = $sth -> execute();
    } catch (PDOException $e) {
        echo("Error :".$e->getMessage());
    }
    return $res;
    
}
function deleteUser($base, $id)
{
    try{
        $sql = "DELETE FROM `User` WHERE `id`=:id";
        $sth = $base -> prepare($sql);

        $sth -> bindParam(':id',$id);

        $res = $sth -> execute();
    } catch (PDOException $e) {
        echo("Error :".$e->getMessage());
    }
    return $res;
}

function updateUser($base, $id, $login, $mdp, $nom, $prenom, $mail, $admin)
{
    try{
        $sql = "UPDATE `User` SET `login,`=':login', `mdp`=':mdp', `nom`=':nom', `prenom`=':prenom', `prenom`=':prenom', `mail`=':mail', `admin`=:admin WHERE `id` = :id";
        $sth = $base->prepare($sql);

        $sth -> bindParam(':login',$login);
        $sth -> bindParam(':mdp',$mdp);
        $sth -> bindParam(':nom',$nom);
        $sth -> bindParam(':prenom',$prenom);
        $sth -> bindParam(':mail',$mail);
        $sth -> bindParam(':admin',$admin);

        $res = $sth -> execute();
    } catch (PDOException $e) {
        echo("Error :".$e->getMessage());
    }
    return $res;
}

function listUser($base)
{
    $sql = "SELECT * FROM `User`";
    $sth = $base -> prepare($sql);
    $sth -> execute();
    return $sth->fetch(PDO::FETCH_ASSOC);
}
function listUserLogin($base)
{
    $sql = "SELECT `login` FROM `User`";
    $sth = $base -> prepare($sql);
    $sth -> execute();
    return $sth -> fetch(PDO::FETCH_ASSOC);
}

function selectUser($base, $login)
{
    $sql = "SELECT * FROM `User`  WHERE `login` = ':login'";
    $sth = $base-> prepare($sql);

    $sth -> bindParam(':login',$login);
    
    $sth -> execute();
    return $sth -> fetch(PDO::FETCH_NUM);
}



