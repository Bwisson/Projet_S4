<?php
include_once ("../../../db/db_connect.php");
include_once ("../../../crud/function_rs_to_table.php");
include_once ("../../../crud/annulationArticle.crud.php");
include_once ("../../../crud/resaArticle.crud.php");

if(isset($_POST['id'], $_POST['id_resa'])){
    $id = $_POST['id'];
    $id_resa = $_POST['id_resa'];
    $res2 = deleteAnnulationArticle($conn, $id);
    $res = deleteResaArticle($conn, $id_resa);
    var_dump($res, $res2);
    if ($res && $res2) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode("$_POST : undef");
    var_dump($_POST);
}
