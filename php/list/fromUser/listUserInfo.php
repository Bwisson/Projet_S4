<?php
include("../db/db_connect.php");
include("../crud/user.crud.php");

$listUser = selectUser($conn, $login);
$strListUser = json_encode($listUser);

echo $strListUser;