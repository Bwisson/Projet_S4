<?php
include("../db/db_connect.php");
include("../crud/resaArticle.crud.php");

$listObjets = listOldResaArticleFromUser($conn, $id_user);
$strListObjets = json_encode($listObjets);

echo $strListObjets;