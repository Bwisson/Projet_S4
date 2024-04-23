<?php

include("../db/db_connect.php");
include("../crud/article.crud.php");

$listPeinture = selectArticleCat($conn, 'pinceaux_outils');
$strListPeinture = json_encode($listPeinture);

echo $strListPeinture;
