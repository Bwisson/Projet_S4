<?php
include("../connection/connection.php");
include_once("../crud/user.crud.php");
include_once ("../list/listUserResas.php");
include_once("../crud/function_rs_to_table.php");

if (isset($_POST)){
    $id_user = $_POST["id"];
//    $res = deleteUser($conn, $id_user);
    $listUserResas = getListResasUser($conn, $_POST);
    var_dump($listUserResas);

//    if($res){
//        echo json_encode(true);
//    }else {
//        echo json_encode(false);
//    }
}else {
    echo "Erreur : POST undef";
}
