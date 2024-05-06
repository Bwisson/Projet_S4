<?php
session_start();
include("../../db/db_connect.php");
include("../../crud/function_rs_to_table.php");
include("../../crud/resaArticle.crud.php");
include("../../crud/resaAtelier.crud.php");
include("../../crud/resaModele.crud.php");

$id_user = $_SESSION["id_user"];

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