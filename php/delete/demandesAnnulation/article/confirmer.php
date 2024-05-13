<?php
include("../../../db/db_connect.php");
include("../../../crud/function_rs_to_table.php");
include("../../../crud/annulationArticle.crud.php");
include("../../../crud/resaArticle.crud.php");

if(isset($_POST['id'], $_POST['id_article'])){
    $id = $_POST['id'];
    $id_article = $_POST['id_article'];
    $res = deleteResaArticle($conn, $id_article);
    $res2 = deleteAnnulationArticle($conn, $id);
    if ($res && $res2) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode("$_POST : non défini");
}
