<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/atelier.crud.php");

$listAteliers = listAtelier($conn);
$strListAteliers = json_encode($listAteliers);

echo $strListAteliers;
