<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/article.crud.php");

$listObjets = listArticle($conn);
$strListObjets = json_encode($listObjets);

echo $strListObjets;
