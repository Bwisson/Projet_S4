<?php
include("function_rs_to_table.php");
include("pdo_connect.php");

function createArticle($base, $code_barre, $nom, $categorie, $couleur, $taille) {
  try{
    $sql = "INSERT INTO `Article` (`code_barre`, `nom`, `categorie`, `couleur`, `taille`) VALUES (:code_barre, :nom, :categorie, :couleur, :taille)";
    $sth = $base -> prepare($sql);

    $sth -> bindParam(':code_barre',$code_barre);
    $sth -> bindParam(':nom',$nom);
    $sth -> bindParam(':categorie',$categorie);
    $sth -> bindParam(':couleur',$couleur);
    $sth -> bindParam(':taille',$taille);
    
    $res = $sth -> execute();
  }catch  (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
  return $res;
}

function deleteArticle($base,$id) {
  try{
    $sql = "DELETE FROM `Article` WHERE `id`=:id";
    $sth = $base -> prepare($sql);
    $sth-> bindParam(':id',$id);
    $res = $sth -> execute();
  }catch(PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
  return $res;
}

function updateArticle($base,$id, $code_barre, $nom, $categorie, $couleur, $taille) {
  try{
    $sql = "UPDATE `Article` SET `code_barre`='$code_barre', `nom`='$nom', `categorie`='$categorie', `couleur`='$couleur', `taille`='$taille' WHERE `id` = $id";
    $sth = $base->prepare($sql);
    
    $sth -> bindParam(':code_barre',$code_barre);
    $sth -> bindParam(':nom',$nom);
    $sth -> bindParam(':categorie',$categorie);
    $sth -> bindParam(':couleur',$couleur);
    $sth -> bindParam(':taille',$taille);
    $sth -> bindParam(':code_barre',$code_barre);
    
    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
  return $res;
}
function listArticle($base){
  $sql = "SELECT * FROM Article";
  $sth = $base -> prepare($sql);
  $sth -> execute();
  return $sth -> fetch(PDO::FETCH_ASSOC);
}
