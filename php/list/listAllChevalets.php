<?php

include("../db/db_connect.php");
include("../crud/article.crud.php");

$listChevalets = selectArticleCat($conn, 'chevalet');
$strListChevalets = json_encode($listChevalets);

echo $strListChevalets;
