<?php
function createAnnulationArticle($conn, $id_resa) {
    $sql = "INSERT INTO `AnnulationArticle` (`id_resaArticle`) VALUES ('$id_resa')";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function deleteAnnulationArticle($conn, $id) {
    $sql = "DELETE FROM `AnnulationArticle` WHERE `id`=$id";
    $res = mysqli_query($conn, $sql);
    return $res;
}

function selectAnnulationArticle($conn, $id){
    $sql = "SELECT * FROM `AnnulationArticle` WHERE id=$id";
    $res = mysqli_query($conn, $sql);
    $rs = rs_to_table($res);
    return $rs;
}

function listAnnulationArticle($conn)
{
    $sql = "SELECT a.id AS id, a.id_resaArticle AS id_resa, r.start AS start, r.end AS end, art.nom AS nom_article, u.nom AS nom_user, u.prenom AS prenom_user FROM `AnnulationArticle` a JOIN `ResaArticle` r ON a.id_resaArticle=r.id JOIN `User` u ON r.id_user=u.id JOIN `Article` art ON r.id_article=art.id WHERE r.end > NOW()";
    $res = mysqli_query($conn, $sql);

    return rs_to_table($res);
}

function listAnnulationArticleUser($conn, $id)
{
    $sql = "SELECT a.id AS id, a.id_resaArticle AS id_resa, r.start AS start, r.end AS end, art.nom AS nom_article, u.nom AS nom_user, u.prenom AS prenom_user FROM `AnnulationArticle` a JOIN `ResaArticle` r ON a.id_resaArticle=r.id JOIN `User` u ON r.id_user=u.id JOIN `Article` art ON r.id_article=art.id WHERE r.end > NOW() AND r.id_user = $id";
    $res = mysqli_query($conn, $sql);

    return rs_to_table($res);
}