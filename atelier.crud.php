<?php
include("function_rs_to_table.php");
include("pdo_connect.php");

function createAtelier($nom, $type) {
  try{
    $sql = "INSERT INTO `Atelier` (`nom`, `type`) VALUES (:nom, :type)";
    $sth = $base -> prepare($sql);
    $sth -> bindParam(:nom;$nom);
    $sth -> bindParam(:type;$type);
    $res = $sth -> execute();
  } catch (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
}
function deleteAtelier($conn, $id) {
  try{
    $sql = "DELETE FROM `Atelier` WHERE `id`=:id";
    $sth = $base -> prepare($sql);
    $sth -> bindParam(:id;$id);
    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur : ".$th -> getMessage());
  }
}
function updateAtelier($id, $nom, $type) {
  try{
    $sql = "UPDATE `Atelier` SET `nom`=:nom, `type`=:type WHERE `id` = :id";
    $sth = $base -> prepare($sql);
    
    $sth -> bindParam(:nom;$nom);
    $sth -> bindParam(:type;$type);
    $stg -> bindParam(:id;$id);
    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
}
function listAtelier($conn) {
    $sql = "SELECT * FROM `Atelier`";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}
