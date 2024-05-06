<?php
session_start();
include("../../db/db_connect.php");
include("../../crud/function_rs_to_table.php");
include("../../crud/user.crud.php");

$login = $_SESSION["login"];

$listUser = selectUser($conn, $login);
$strListUser = json_encode($listUser);

echo $strListUser;