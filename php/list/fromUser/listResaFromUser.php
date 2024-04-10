<?php
include("../../db/db_connect.php");
include("../../crud/resaArticle.crud.php");
include("../../crud/resaAtelier.crud.php");
include("../../crud/resaModele.crud.php");

$listArticles = listResaArticleFromUser($conn, $id_user);
$listAteliers = listResaAtelierFromUser($conn, $id_user);
$listModeles = listResaModeleFromUser($conn, $id_user);
$listObjets = array(
    "articles" => $listArticles,
    "ateliers" => $listAteliers,
    "modeles" => $listModeles,
);
$strListObjets = json_encode($listObjets);

echo $strListObjets;