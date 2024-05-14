<?php
include_once ("../connection/connection.php");
include_once ("../crud/user.crud.php");
include_once ("../crud/resaArticle.crud.php");
include_once ("../crud/resaAtelier.crud.php");
include_once ("../crud/resaModele.crud.php");
include_once ("../crud/function_rs_to_table.php");
include_once ("../list/listUserResas.php");
include_once ("../list/listUserAnnulation.php");

if (isset($_POST)){
    $id_user = $_POST["id"];

    $listUserResas = getListResasUser($conn, $_POST);
    $listUserResasArticles = $listUserResas["articles"];
    $listUserResasAteliers = $listUserResas["ateliers"];
    $listUserResasModeles = $listUserResas["modeles"];

    $resArticle = false;
    $resAtelier = false;
    $resModele = false;

    if (!empty($listUserResasArticles)){
        foreach ($listUserResasArticles as $value){
            $resArticle = deleteResaArticle($conn, $value["id"]);
        }
    }
    if (!empty($listUserResasAteliers)){
        foreach ($listUserResasAteliers as $value){
            $resAtelier = deleteResaAtelier($conn, $value["id"]);
        }
    }
    if (!empty($listUserResasModeles)){
        foreach ($listUserResasModeles as $value){
            $resModele = deleteResaModele($conn, $value["id"]);
        }
    }

    $listUserAnnulations = getListAnnulationUser($conn, $_POST);
    $listUserAnnulationsArticles = $listUserAnnulations["annulationArticles"];
    $listUserAnnulationsAteliers = $listUserAnnulations["annulationAteliers"];
    $listUserAnnulationsModeles = $listUserAnnulations["annulationModeles"];

    $resAnnulationArticle = false;
    $resAnnulationAtelier = false;
    $resAnnulationModele = false;

    if (!empty($listUserAnnulationsArticles)){
        foreach ($listUserAnnulationsArticles as $value){
            $resAnnulationArticle = deleteAnnulationArticle($conn, $value["id"]);
        }
    }
    if (!empty($listUserAnnulationsAteliers)){
        foreach ($listUserAnnulationsAteliers as $value){
            $resAnnulationAtelier = deleteAnnulationAtelier($conn, $value["id"]);
        }
    }
    if (!empty($listUserAnnulationsModeles)){
        foreach ($listUserAnnulationsModeles as $value){
            $resAnnulationModele = deleteAnnulationModele($conn, $value["id"]);
        }
    }


    if (((!empty($resArticle) && $resArticle) || (empty($resArticle) && $resArticle == false)) || ((!empty($resAtelier) && $resAtelier) || (empty($resArticle) && $resArticle == false)) || ((!empty($resModele) && $resModele) || (empty($resArticle) && $resArticle == false))){
       if (((!empty($resAnnulationArticle) && $resAnnulationArticle) || (empty($resAnnulationArticle) && $resAnnulationArticle == false)) || ((!empty($resAnnulationAtelier) && $resAnnulationAtelier) || (empty($resAnnulationAtelier) && $resAnnulationAtelier == false)) || ((!empty($resAnnulationModele) && $resAnnulationModele) || (empty($resAnnulationModele) && $resAnnulationModele == false))){
           $res = deleteUser($conn, $id_user);
           if ($res){
               echo json_encode(true);
           }else{
               echo ("Erreur lors de la suppression de l'utilisateur");
           }
       }else {
           echo json_encode("Erreur : les demandes d'annulation n'ont pas été supprimées");
       }
    }else {
        echo json_encode("Erreur : les resas n'ont pas été supprimées");
    }
}else {
    echo "Erreur : POST undef";
}
