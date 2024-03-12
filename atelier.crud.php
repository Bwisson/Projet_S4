<?php
include("function_rs_to_table.php");
include("pdo_connect.php");

function createAtelier($base, $nom, $type) {
  try{
    $sql = "INSERT INTO `Atelier` (`nom`, `type`) VALUES (:nom, :type)";
    $sth = $base -> prepare($sql);
    $sth -> bindParam(':nom',$nom);
    $sth -> bindParam(':type',$type);
    $res = $sth -> execute();
  } catch (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
  return $res;
}
function deleteAtelier($base, $id) {
  try{
    $sql = "DELETE FROM `Atelier` WHERE `id`=:id";
    $sth = $base -> prepare($sql);
    $sth -> bindParam(':id',$id);
    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur : ".$th -> getMessage());
  }
  return $res;
}
function updateAtelier($base, $id, $nom, $type) {
  try{
    $sql = "UPDATE `Atelier` SET `nom`=:nom, `type`=:type WHERE `id` = :id";
    $sth = $base -> prepare($sql);
    
    $sth -> bindParam(':nom',$nom);
    $sth -> bindParam(':type',$type);
    $sth -> bindParam(':id',$id);
    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
  return $res;
}
function listAtelier($base) {
    $sql = "SELECT * FROM `Atelier`";
    $sth = $base -> prepare($sql);
    $sth -> execute();
    return $sth -> fetch(PDO::FETCH_ASSOC);
}