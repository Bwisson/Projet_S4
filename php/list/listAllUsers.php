<?php
include("../db/db_connect.php");
include("../crud/User.crud.php");

$listUser = listUser($conn);
$strListUser = json_encode($listUser);

echo $strListUser;
