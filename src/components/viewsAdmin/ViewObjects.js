/* Librairy imports */
import React, { useState, useEffect } from "react";
import axios from "axios";

/* components imports */
import Button from "../Button";
import CreateArticle from "./CreateArticle"

/* css imports */
import '../../css/cssViewsAdmin/ViewObjects.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'

function ViewObjects() {
    const [modeles, setModeles] = useState(null)
    const [ateliers, setAteliers] = useState(null)
    const [articles, setArticles] = useState(null)

    const [newData, setNewData] = useState(false)

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
                .then(response => {
                    setArticles(response.data)
                    setNewData(false)
                })
        }

        getModeles();
        getAteliers();
        getArticles();
    }, [newData])

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
        let list_ateliers= null
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
                <ListModeles/>
                </tbody>
            </table>
            {modeles == null ? <i>Aucun modèles</i> : null}

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
                <ListAteliers/>
                </tbody>
            </table>
            {ateliers == null ? <i>Aucun ateliers</i> : null}

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
                <ListArticles/>
                </tbody>
            </table>
            {articles == null ? <i>Aucun articles</i> :null}
            <CreateArticle setNewData={setNewData}/>
        </div>
    )
}

export default ViewObjects;