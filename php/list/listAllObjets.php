<?php
include("../db/db_connect.php");
include("../crud/user.crud.php");

$listObjets = listObjet($conn);
$strListObjets = json_encode($listObjets);

echo $strListObjets;
