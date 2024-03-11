<?php
include("../db/db_connect.php");
include("../crud/atelier.crud.php");

$listAteliers = listAtelier($conn);
$strListAteliers = json_encode($listAteliers);

echo $strListAteliers;
