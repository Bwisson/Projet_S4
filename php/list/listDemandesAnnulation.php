<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/annulationArticle.crud.php");
include("../crud/annulationAtelier.crud.php");
include("../crud/annulationModele.crud.php");

$listArticles = listAnnulationArticle($conn);
$listAteliers = listAnnulationAtelier($conn);
$listModeles = listAnnulationModele($conn);
$listObjets = array(
    "articles" => $listArticles,
    "ateliers" => $listAteliers,
    "modeles" => $listModeles,
);

$res = json_encode($listObjets);

echo $res;