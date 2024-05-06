<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/modele.crud.php");

$listModeles = listModele($conn);
$strListModeles = json_encode($listModeles);

echo $strListModeles;
