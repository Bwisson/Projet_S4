<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/article.crud.php");

$listChevalets = selectArticleCat($conn, 'chevalet');
$strListChevalets = json_encode($listChevalets);

echo $strListChevalets;
