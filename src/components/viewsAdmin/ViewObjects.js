/* Librairy imports */
import React, { useState, useEffect } from "react";

/* components imports */
import Button from "../Button";

/* css imports */
import '../../css/cssViewsAdmin/ViewObjects.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'
import axios from "axios";

// const modeles = [
//     {"nom" : "tcha", "prenom" : "jonathan", "genre" : "homme", "age" : 20, "tarif_horaire" : 50},
//     {"nom" : "tcha", "prenom" : "jonathan", "genre" : "homme", "age" : 20, "tarif_horaire" : 20}
// ]
//
// const ateliers = [
//     {"nom" : "chartreuse", "type" : "photographie"},
//     {"nom" : "nivolet", "type" : "sculpture"}
// ]
//
// const Articles = [
//     {"code_barre" : "0025873", "nom" : "pinceau", "categorie" : "pinceaux_outils", "couleur" : "marron", "taille" : "petit"},
//     {"code_barre" : "0025873", "nom" : "chevalet", "categorie" : "pinceaux_outils", "couleur" : "jaune", "taille" : "grand"}
// ]

function ViewObjects() {
    const [modeles, setModeles] = useState(null)
    const [ateliers, setAteliers] = useState(null)
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        function getModeles() {
            axios.get("./php/list/listAllModeles.php")
                .then(response => { setModeles(response.data) })
        }
        function getAteliers() {
            axios.get("./php/list/listAllAteliers.php")
                .then(response => { setAteliers(response.data) })
        }
        function getArticles() {
            axios.get("./php/list/listAllArticles.php")
                .then(response => { setArticles(response.data) })
        }

        getModeles();
        getAteliers();
        getArticles();
    }, [])

    function ListModeles(){
        let list_modeles = null
        if(modeles != null){
            list_modeles = modeles.map(modele =>
                <tr>
                    <td>{modele.nom}</td>
                    <td>{modele.prenom}</td>
                    <td>{modele.genre}</td>
                    <td>{modele.age}</td>
                    <td>{modele.tarif_horaire} €</td>
                    {/*<td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>*/}
                </tr>
            );
        }
        return list_modeles
    }

    function ListAteliers(){
        let list_ateliers = null
        if(ateliers != null){
            list_ateliers = ateliers.map(atelier =>
                <tr>
                    <td>{atelier.nom}</td>
                    <td>{atelier.type}</td>
                    {/*<td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>*/}
                </tr>
            );
        }
        return list_ateliers
    }

    function ListArticles(){
        console.log(articles)
        let list_articles = null
        if(articles != null){
            list_articles = articles.map(article =>
                <tr>
                    <td>{article.code_barre}</td>
                    <td>{article.nom}</td>
                    <td>{article.categorie}</td>
                    <td>{article.couleur}</td>
                    <td>{article.taille}</td>
                    {/*<td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>*/}
                </tr>
            );
        }
        return list_articles
    }

    return (
        <div className="ViewObjects">
            <table>
                <caption>
                    Modèles
                </caption>
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Âge</th>
                    <th scope="col">Tarif horaire</th>
                </tr>
                </thead>
                <tbody>
                {<ListModeles/> != null ? <ListModeles/> : null}
                </tbody>
            </table>
            {<ListModeles/> == null ? <i>Aucun utilisateurs</i> : null}

            <table>
                <caption>
                    Ateliers
                </caption>
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Type</th>
                </tr>
                </thead>
                <tbody>
                {<ListAteliers/> != null ? <ListAteliers/> : null}
                </tbody>
            </table>
            {<ListAteliers/> == null ? <i>Aucun utilisateurs</i> : null}
            <table>
                <caption>
                    Articles
                </caption>
                <thead>
                <tr>
                    <th scope="col">Code barre</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Catégorie</th>
                    <th scope="col">Couleur</th>
                    <th scope="col">Taille</th>
                </tr>
                </thead>
                <tbody>
                {<ListArticles/> != null ? <ListArticles/> : null}
                </tbody>
            </table>
            {<ListArticles/> == null ? <i>Aucun utilisateurs</i> : null}

        </div>
    )
}

export default ViewObjects;