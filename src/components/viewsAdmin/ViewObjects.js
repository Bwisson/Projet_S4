/* Librairy imports */
import React, {useState, useEffect} from "react"
import axios from "axios"

/* components imports */
import Button from "../Button";
import CreateArticle from "./CreateArticle"
import CreateAtelier from "./CreateAtelier"
import CreateModele from "./CreateModele"
import PopupObjectInfo from './PopupObjectInfo'

/* css imports */
import '../../css/cssViewsAdmin/ViewObjects.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'

function ViewObjects({isAdmin}) {
    const [modeles, setModeles] = useState(null)
    const [ateliers, setAteliers] = useState(null)
    const [articles, setArticles] = useState(null)

    const [newData, setNewData] = useState(false)

    const [showingFormAddArticle, setShowingFormAddArticle] = useState(false)
    const [showingFormAddAtelier, setShowingFormAddAtelier] = useState(false)
    const [showingFormAddModele, setShowingFormAddModele] = useState(false)

    const [showPopupObject, setShowPopupObject] = useState(false)
    const [objectIdClicked, setObjectIdClicked] = useState(null)
    const [objectClassClicked, setObjectClassClicked] = useState(null)
    const [popupPosition, setPopupPosition] = useState(null)


    // const svgPlus = "<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 24 24\" fill=\"none\"\n xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M6 12H18M12 6V18\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round stroke-linejoin=\"round\"/></svg>"

    useEffect(() => {
        function getModeles() {
            axios.get("./php/list/listAllModeles.php")
                .then(response => {
                    let dataResponse = response.data
                    if (dataResponse != null){
                        dataResponse.reverse()
                    }
                    setModeles(dataResponse)
                    setNewData(false)
                })
        }
        function getAteliers() {
            axios.get("./php/list/listAllAteliers.php")
                .then(response => {
                    let dataResponse = response.data
                    if (dataResponse != null){
                        dataResponse.reverse()
                    }
                    setAteliers(dataResponse)
                    setNewData(false)
                })
        }
        function getArticles() {
            axios.get("./php/list/listAllArticles.php")
                .then(response => {
                    let dataResponse = response.data
                    if (dataResponse != null){
                        dataResponse.reverse()
                    }
                    setArticles(dataResponse)
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
                <tr className={modele.id + " Modeles"} onClick={popupObjectVisible}>
                    <td>{modele.nom}</td>
                    <td>{modele.prenom}</td>
                    <td>{modele.genre}</td>
                    <td>{modele.age}</td>
                    <td>{modele.tarif_horaire} €/h</td>
                </tr>
            );
        }

        return list_modeles
    }
    function ListAteliers(){
        let list_ateliers= null
        if(ateliers != null){
            list_ateliers = ateliers.map(atelier =>
                <tr className={atelier.id + " Ateliers"} onClick={popupObjectVisible}>
                    <td>{atelier.nom}</td>
                    <td>{atelier.type}</td>
                </tr>
            );
        }

        return list_ateliers
    }
    function ListArticles(){
        let list_articles = null
        if(articles != null){
            list_articles = articles.map(article =>
                <>
                    <tr className={article.id + " Articles"} onClick={popupObjectVisible}>
                        <td>{article.code_barre}</td>
                        <td>{article.nom}</td>
                        <td>{article.categorie}</td>
                        <td>{article.couleur}</td>
                        <td>{article.taille}</td>
                    </tr>
                </>
            );
        }

        return list_articles
    }

    function showFormCreateArticle() {
        setShowingFormAddArticle(!showingFormAddArticle)
    }

    function showFormCreateAtelier() {
        setShowingFormAddAtelier(!showingFormAddAtelier)
    }

    function showFormCreateModele() {
        setShowingFormAddModele(!showingFormAddModele)
    }

    function popupObjectVisible(event){
        let objectClass = event.target.parentElement.classList
        let scroll = event.view.scrollY

        setObjectIdClicked(objectClass.item(0))
        setObjectClassClicked(objectClass.item(1))
        setPopupPosition(((event.view.screen.height)/2) + scroll)

        setShowPopupObject(true)
    }

    function popupObjectUnvisible() {
        setShowPopupObject(false)
    }

    return (
        <div className="ViewObjects">
            {isAdmin ?
                <>
                    <div className="tableForm">
                        {showingFormAddModele && <CreateModele setNewData={setNewData} setShowingFormAddModele={setShowingFormAddModele}/>}
                        <table className={"adminTable adminTableObjects"}>
                            <caption>
                                Modèles <Button onSmash={showFormCreateModele} text={"+"} bgColor={"#2882ff"}/>
                            </caption>
                            <thead>
                            <tr onClick={popupObjectVisible}>
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
                    </div>
                    {modeles == null && <i>Aucun modèles</i>}

                    <div className="tableForm">
                        {showingFormAddAtelier && <CreateAtelier setNewData={setNewData} setShowingFormAddAtelier={setShowingFormAddAtelier}/>}
                        <table className={"adminTable adminTableObjects"}>
                            <caption>
                                Ateliers <Button onSmash={showFormCreateAtelier} text={"+"} bgColor={"#2882ff"}/>

                            </caption>
                            <thead>
                            <tr onClick={popupObjectVisible}>
                                <th scope="col">Nom</th>
                                <th scope="col">Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            <ListAteliers/>
                            </tbody>
                        </table>
                    </div>
                    {ateliers == null && <i>Aucun ateliers</i>}

                    <div className="tableForm">
                        {showingFormAddArticle && <CreateArticle setNewData={setNewData} setShowingFormAddArticle={setShowingFormAddArticle}/>}
                        <table className={"adminTable"}>
                            <caption>
                                Articles <Button onSmash={showFormCreateArticle} text={"+"} bgColor={"#2882ff"}/>
                            </caption>
                            <thead>
                            <tr onClick={popupObjectVisible}>
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
                        {articles == null && <i>Aucun articles</i>}
                    </div>
                    {showPopupObject &&
                        <>
                            <div onClick={popupObjectUnvisible} className="foreground"></div>
                            <PopupObjectInfo id_objet={objectIdClicked} type_objet={objectClassClicked} setPopupObjectVisible={setShowPopupObject} positionY={popupPosition} sendNewdata={setNewData}/>
                        </>}
                        </>:
                        <p>Désolé vous n'avez pas accès à cette page</p>
            }
            </div>
    )
}

export default ViewObjects;