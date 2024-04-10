<?php
include("../db/db_connect.php");
include("../crud/article.crud.php");

$listObjets = selectArticle($conn,$id);
$strListObjets = json_encode($listObjets);

echo $strListObjets;
