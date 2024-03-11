<?php
include("../db/db_connect.php");
include("../crud/user.crud.php");

$listAteliers = listAtelier($conn);
$strListAteliers = json_encode($listAteliers);

echo $strListAteliers;
