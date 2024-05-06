<?php
include("../db/db_connect.php");
include("../crud/function_rs_to_table.php");
include("../crud/user.crud.php");

if(isset($_POST['id'])){
    $id_user = $_POST['id'];

    $user = selectUserById($conn, $id_user);
    $res = json_encode($user);
}else{
    $res = "Erreur : post pas définis";
}

echo $res;