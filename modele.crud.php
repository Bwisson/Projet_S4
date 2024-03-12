<?php
include("function_rs_to_table.php");
include("pdo_connect.php");

function createModele($base, $id, $nom, $prenom, $genre, $tarif_horaire) {
  try{
    $sql = "INSERT INTO `Modele` (`id`, `nom`, `prenom`, `genre`, `tarif_horaire`) VALUES (:id, :nom, :prenom, :genre, :tarif_horaire)";
    $sth = $base -> prepare($sql);

    $sth -> bindParam(':id',$id);
    $sth -> bindParam(':nom',$nom);
    $sth -> bindParam(':prenom',$prenom);
    $sth -> bindParam(':genre',$genre);
    $sth -> bindParam(':tarif_horaire',$tarif_horaire);

    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur :".$th->getMessage());
  }
  return $res;
}

function deleteModele($base, $id) {
  try{
    $sql = "DELETE FROM `Modele` WHERE `id`=:id";
    $sth = $base -> prepare($sql);

    $sth -> bindParam(':id',$id);
    
    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
  return $res;
}
function updateModele($base, $id, $nom, $prenom, $genre, $tarif_horaire) {
    try{
      $sql = "UPDATE `Modele` SET `id`='$id', `nom`='$nom', `prenom`='$prenom', `genre`='$genre', `tarif_horaire`='$tarif_horaire' WHERE `id` = $id";
      $sth = $base -> prepare($sql);
  
      $sth -> bindParam(':id',$id);
      $sth -> bindParam(':nom',$nom);
      $sth -> bindParam(':prenom',$prenom);
      $sth -> bindParam(':genre',$genre);
      $sth -> bindParam(':tarif_horaire',$tarif_horaire);

      $res = $sth -> execute();
    }catch (PDOException $th){
      echo("Erreur :".$th->getMessage());
    }
    return $res;
}
function listModele($base) {
    $sql = "SELECT * FROM `Modele`";
    $sth = $base -> prepare($sql);
    $sth -> execute();
    return $sth -> fetch(PDO::FETCH_ASSOC);
}
