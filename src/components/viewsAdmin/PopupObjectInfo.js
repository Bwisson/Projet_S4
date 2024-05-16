import {useEffect, useState} from "react";
import axios from 'axios'

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/PopupObjectInfo.scss"
import "../../css/cssViewsAdmin/popup.scss"

function PopupObjectInfo({id_objet, type_objet, setPopupObjectVisible, positionY, sendNewdata}){
    const [objectInfos, setObjectInfos] = useState([])

    const [modifObjectInfos, setModifObjectInfos] = useState(false)
    const [newData, setNewData] = useState(false)
    sendNewdata(newData)
    const [delObject, setDelObject] = useState(false)

    const [nom, setNom] = useState(null)
    const [prenom, setPrenom] = useState(null)
    const [genre, setGenre] = useState(null)
    const [age, setAge] = useState(null)
    const [tarif_horaire, setTarif_horaire] = useState(null)
    const [type, setType] = useState(null)
    const [codeBarre, setCodeBarre] = useState(null)
    const [categorie, setCategorie] = useState(null)
    const [couleur, setCouleur] = useState(null)
    const [taille, setTaille] = useState(null)

    const [invalidCodeBarre, setInvalidCodeBarre] = useState(false)

    useEffect(() => {
        function getObjectInfo(){
           let form_data = new FormData()
            form_data.append("id", id_objet)
            form_data.append("type", type_objet)
            axios.post("./php/select/selectObject.php", form_data)
                .then(response => {
                    let datas = response.data
                    setObjectInfos(datas)
                    setNom(datas[0].nom)
                    if (type_objet === "Modeles"){
                        setPrenom(datas[0].prenom)
                        setGenre(datas[0].genre)
                        setAge(datas[0].age)
                        setTarif_horaire(datas[0].tarif_horaire)
                    }else if (type_objet === "Articles") {
                        setCodeBarre(datas[0].code_barre)
                        setCategorie(datas[0].categorie)
                        setCouleur(datas[0].couleur)
                        setTaille(datas[0].taille)
                    }else if (type_objet === "Ateliers") {
                        setType(datas[0].type)
                    }
                    setNewData(false)
                })
        }
        getObjectInfo()
    }, [newData]);

    function popupObjectUnvisible() {
        setPopupObjectVisible(false)
    }

    function modifObjectAvailable() {
        let list_inputs = document.getElementsByTagName("input")
        let list_select = document.getElementsByTagName("select")

        for (let i = 0; i < list_inputs.length; i++) {
            list_inputs[i].disabled = false
        }

        for (let i = 0; i < list_select.length; i++) {
            list_select[i].disabled = false
        }

        setModifObjectInfos(true)
    }

    function cancelObjectModif() {
        let list_inputs = document.getElementsByTagName("input")
        let list_select = document.getElementsByTagName("select")

        for (let i = 0; i < list_inputs.length; i++) {
            list_inputs[i].disabled = true
        }

        for (let i = 0; i < list_select.length; i++) {
            list_select[i].disabled = true
        }

        setModifObjectInfos(false)

        setNom(objectInfos[0].nom)
        if (type_objet === "Modeles"){
            setPrenom(objectInfos[0].prenom)
            setGenre(objectInfos[0].genre)
            setAge(objectInfos[0].age)
            setTarif_horaire(objectInfos[0].tarif_horaire)
        }else if (type_objet === "Articles") {
            setCodeBarre(objectInfos[0].code_barre)
            setCategorie(objectInfos[0].categorie)
            setCouleur(objectInfos[0].couleur)
            setTaille(objectInfos[0].taille)
        }else if (type_objet === "Ateliers") {
            setType(objectInfos[0].type)
        }
    }

    function sendModifUser(){
        let form_data = new FormData()

        form_data.append("id", objectInfos[0].id)
        form_data.append("type_objet", type_objet)
        form_data.append("nom", nom)

        if (type_objet === "Modeles"){
            form_data.append("prenom", prenom)
            form_data.append("genre", genre)
            form_data.append("age", age)
            form_data.append("tarif_horaire", tarif_horaire)

        }else if (type_objet === "Articles" && !invalidCodeBarre){
            form_data.append("code_barre", codeBarre)
            form_data.append("categorie", categorie)
            form_data.append("couleur", couleur)
            form_data.append("taille", taille)

        }else if (type_objet === "Ateliers"){
            form_data.append("type", type)

        }else {
            console.log("Type objet inconnu au batillon !")
        }

        axios.post("./php/update/updateObject.php", form_data)
            .then(response => {
                setNewData(response.data)
                if (response.data){
                    cancelObjectModif()
                }//else afficher un message erreur modif ne s'est pas faite
            })
    }

    function showDeleteDialog(){
        let dialog = document.getElementById("favDialog")
        dialog.showModal();
    }
    function deleteObject(e){
        setDelObject(e.target.value)

        if (delObject){
            let form_data = new FormData()
            form_data.append("id_objet", objectInfos.id)
            form_data.append("type_objet", type_objet)

            axios.post("./php/delete/deleteObject.php", form_data)
                .then(response => setDelObject(response.data))
        }
    }

    function showInvalidCodeBarre(){
        if (codeBarre.length > 7 || codeBarre.length < 7){
            setInvalidCodeBarre(true)
            console.log("erreur code barre")
        }else {
            setInvalidCodeBarre(false)
        }
    }

    let popup = document.getElementsByClassName("PopupObjectInfo")

    if (popup[0] != undefined){
        let popupHeight = popup[0].clientHeight
        positionY = positionY - (popupHeight/1.4)
    }

    return (
        <div className={"PopupObjectInfo popup"} style={{top: positionY + 'px'}}>
            <Button id={"btnClose"} onSmash={popupObjectUnvisible} text={"X"} bgColor={"#ff2828"}/>

            <div className={"containerFormPopUser"}>
                {objectInfos.length > 0 && type_objet === "Modeles" &&
                    <form className={"formPopUser"}>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"nom"}>Nom : </label>
                            <input id="nom" type="text" value={nom} onChange={e => setNom(e.target.value)} disabled={true}/>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"prenom"}>Prénom : </label>
                            <input id="prenom" type="text" value={prenom} onChange={e => setPrenom(e.target.value)} disabled={true}/>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label id="genre" htmlFor={"genre"}>Genre : </label>
                            <select name="" id="select-genre" value={genre} onChange={e => setGenre(e.target.value)} disabled={true}>
                                <option value="femme">Femme</option>
                                <option value="homme">Homme</option>
                            </select>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"age"}>Âge : </label>
                            <input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} disabled={true}/>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"tarif_horaire"}>Tarif horaire : </label>
                            <input id="tarif_horaire" type="number" value={tarif_horaire} onChange={e => setTarif_horaire(e.target.value)} disabled={true}/>
                        </div>
                    </form>
                }
                {objectInfos.length > 0 && type_objet === "Articles" &&
                    <form className={"formPopUser"}>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"code_barre"}>Code barre : </label>
                            <input id="code_barre" type="text" value={codeBarre} onBlur={showInvalidCodeBarre} onChange={e => setCodeBarre(e.target.value)} disabled={true}/>
                            {invalidCodeBarre && <p className={"formError"}>Le code barre doit faire 7 caractères</p>}
                        </div>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"nom"}>Nom : </label>
                            <input id="nom" type="text" value={nom} onChange={e => setNom(e.target.value)} disabled={true}/>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label id="select-categorie" htmlFor={"genre"}>Catégorie : </label>
                            <select name="categorie" id="select-categorie" value={categorie} onChange={e => setCategorie(e.target.value)} disabled={true}>
                                <option value="chevalet">Chevalet</option>
                                <option value="pinceaux_outils">Pinceaux et outils de peinture</option>
                            </select>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"couleur"}>Couleur : </label>
                            <input id="couleur" type="text" value={couleur} onChange={e => setCouleur(e.target.value)} disabled={true}/>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label htmlFor="taille_select">Taille :</label>
                            <select name="taille" id="taille_select" value={taille} onChange={e => setTaille(e.target.value)} disabled={true}>
                                <option value="U">U</option>
                                <option value="petit">Petit</option>
                                <option value="moyen">Moyen</option>
                                <option value="grand">Grand</option>
                            </select>
                        </div>
                    </form>
                }
                {objectInfos.length > 0 && type_objet === "Ateliers" &&
                    <form className={"formPopUser"}>
                        <div className={"divFormPopUser"}>
                            <label htmlFor={"nom"}>Nom : </label>
                            <input id="nom" type="text" value={nom} onChange={e => setNom(e.target.value)} disabled={true}/>
                        </div>
                        <div className={"divFormPopUser"}>
                            <label htmlFor="type_select">Type d'atelier :</label>
                            <select name="type" id="type_select" value={type} onChange={e => setType(e.target.value)} disabled={true}>
                                <option value="photographie">Photographie</option>
                                <option value="peinture">Peinture</option>
                                <option value="sculpture">Sculpture</option>
                            </select>
                        </div>
                    </form>
                }
                {modifObjectInfos ?
                    <div className={"btnModifPopUpUser"}>
                        <Button id={"btnCancelPopUpUser"} onSmash={cancelObjectModif} text={"Annuler"} bgColor={"red"}/>
                        <Button id={"btnSavePopUpUser"} onSmash={sendModifUser} text={"Enregistrer"}
                                bgColor={"#2882ff"}/>
                    </div>
                    :
                    <div className={"btnModifPopUpUser"}>
                        <Button id={"btnEditPopUpUser"} onSmash={modifObjectAvailable} text={"Modifier"}
                                bgColor={"#2882ff"}/>
                        <Button id={"btnDeletePopUpUser"} onSmash={showDeleteDialog} text={"Supprimer l'utilisateur"}
                                bgColor={"red"}/>
                    </div>}
            </div>

            <dialog id="favDialog">
                <form className={"formDialogPopupUser"} method="dialog">
                <p>
                        Vous êtes sur le point de supprimer <i>{objectInfos.nom}</i> de la base de donnée.<br/>
                        Êtes-vous sûr ?
                    </p>
                    <menu>
                        <Button id={"cancelBtn"} text={"Annuler"} bgColor={"#2882ff"} onSmash={deleteObject}
                                value={false}/>
                        <Button id={"confirmBtn"} text={"Confirmer"} bgColor={"red"} onSmash={deleteObject}
                                value={true}/>
                    </menu>
                </form>
            </dialog>
        </div>
    )
}

export default PopupObjectInfo