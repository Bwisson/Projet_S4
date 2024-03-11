<?php
include("function_rs_to_table.php");
include("pdo_connect.php");

function createModele($id, $nom, $prenom, $genre, $tarif_horaire) {
  try{
    $sql = "INSERT INTO `Modele` (`id`, `nom`, `prenom`, `genre`, `tarif_horaire`) VALUES (:id, :nom, :prenom, :genre, :tarif_horaire)";
    $sth = $base -> prepare($sql);

    $sth -> bindParam(:id;$id);
    $sth -> bindParam(:nom;$nom);
    $sth -> bindParam(:prenom;$prenom);
    $sth -> bindParam(:genre;$genre);
    $sth -> bindParam(:tarif_horaire;$tarif_horaire);

    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur :".$th->getMessage());
  }
}

function deleteModele($id) {
  try{
    $sql = "DELETE FROM `Modele` WHERE `id`=:id";
    $sth = $base -> prepare($sql);

    $sth -> bindParam(:id;$id);
    
    $res = $sth -> execute();
  }catch (PDOException $th){
    echo("Erreur : ".$th->getMessage());
  }
}
function updateModele($id, $nom, $prenom, $genre, $tarif_horaire) {
    try{
      $sql = "UPDATE `Modele` SET `id`='$id', `nom`='$nom', `prenom`='$prenom', `genre`='$genre', `tarif_horaire`='$tarif_horaire' WHERE `id` = $id";
      $sth = $base -> prepare($sql);
  
      $sth -> bindParam(:id;$id);
      $sth -> bindParam(:nom;$nom);
      $sth -> bindParam(:prenom;$prenom);
      $sth -> bindParam(:genre;$genre);
      $sth -> bindParam(:tarif_horaire;$tarif_horaire);

      $res = $sth -> execute();
    }catch (PDOException $th){
      echo("Erreur :".$th->getMessage());
    }
}
function listModele($conn) {
    $sql = "SELECT * FROM `Modele`";
    $res = mysqli_query($conn,$sql);
    $rs = rs_to_table($res);

    if(mysqli_num_rows($res) == 0){
        $rs = null;
    }

    return $rs;
}
