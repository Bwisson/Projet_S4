<?php
include("../db/db_connect.php");
include("../crud/modele.crud.php");

$listModeles = listModele($conn);
$strListModeles = json_encode($listModeles);

echo $strListModeles;
