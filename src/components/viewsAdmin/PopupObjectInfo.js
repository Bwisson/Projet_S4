import {useEffect, useState} from "react";
import axios from 'axios'

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/popup.scss"
import "../../css/cssViewsAdmin/PopupObjectInfo.scss"


function PopupObjectInfo({id_objet, type_objet, setPopupObjectVisible, positionY, sendNewdata}){
    const [objectInfos, setObjectInfos] = useState([])

    const [modifObjectInfos, setModifObjectInfos] = useState(false)
    const [newData, setNewData] = useState(false)
    sendNewdata(newData)
    const [delObject, setDelObject] = useState(false)

    useEffect(() => {
        function getObjectInfo(){
           let form_data = new FormData()
            form_data.append("id", id_objet)
            form_data.append("type", type_objet)
            axios.post("./php/select/selectObject.php", form_data)
                .then(response => {
                    setObjectInfos(response.data)
                    setNewData(false)
                })
        }
        getObjectInfo()
    }, [newData]);

    function popupObjectUnvisible() {
        setPopupObjectVisible(false)
    }

    function CreateForm() {
        let res = <p>Aucunes données</p>

        if (objectInfos != undefined) {
            if (objectInfos.length > 0) {
                if (type_objet === "Modeles") {
                    res =
                        <form className={"formPopUser"}>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"nom"}>Nom : </label>
                                <input id="nom" type="text" value={objectInfos[0].nom} disabled={true}/>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"prenom"}>Prénom : </label>
                                <input id="prenom" type="text" value={objectInfos[0].prenom} disabled={true}/>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label id="genre" htmlFor={"genre"}>Genre : </label>
                                <select name="" id="select-genre">
                                    <option value="">-- choisir une option --</option>
                                    <option value="femme">femme</option>
                                    <option value="homme">Homme</option>
                                </select>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"age"}>Âge : </label>
                                <input id="age" type="number" value={objectInfos[0].age} disabled={true}/>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"tarif_horaire"}>Tarif horaire : </label>
                                <input id="tarif_horaire" type="number" value={objectInfos[0].tarif_horaire}
                                       disabled={true}/>
                            </div>
                        </form>
                } else if (type_objet === "Articles") {
                    res =
                        <form className={"formPopUser"}>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"code_barre"}>Code barre : </label>
                                <input id="code_barre" type="text" value={objectInfos[0].code_barre} disabled={true}/>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"nom"}>Nom : </label>
                                <input id="nom" type="text" value={objectInfos[0].prenom} disabled={true}/>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label id="select-categorie" htmlFor={"genre"}>Catégorie : </label>
                                <select name="categorie" id="select-categorie">
                                    <option value="">-- Choisir une catégorie --</option>
                                    <option value="chevalet">Chevalet</option>
                                    <option value="pinceaux_outils">Pinceaux et outils de peinture</option>
                                </select>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"couleur"}>Couleur : </label>
                                <input id="couleur" type="text" value={objectInfos[0].couleur} disabled={true}/>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label htmlFor="taille_select">Taille :</label>
                                <select name="taille" id="taille_select">
                                    <option value="U">U</option>
                                    <option value="petit">petit</option>
                                    <option value="moyen">moyen</option>
                                    <option value="grand">grand</option>
                                </select>
                            </div>
                        </form>

                } else if (type_objet === "Ateliers") {
                    res =
                        <form className={"formPopUser"}>
                            <div className={"divFormPopUser"}>
                                <label htmlFor={"nom"}>Nom : </label>
                                <input id="nom" type="text" value={objectInfos[0].prenom} disabled={true}/>
                            </div>
                            <div className={"divFormPopUser"}>
                                <label htmlFor="type_select">Type d'atelier :</label>
                                <select name="type" id="type_select">
                                    <option value="">-- Choisir le type d'atelier --</option>
                                    <option value="photographie">Photographie</option>
                                    <option value="peinture">Peinture</option>
                                    <option value="sculputure">Sculpture</option>
                                </select>
                            </div>
                        </form>
                }
            }
        }
        return res
    }

    function modifObjectAvailable() {
        let list_inputs = document.getElementsByTagName("input")

        for (let i = 0; i < list_inputs.length; i++) {
            list_inputs[i].disabled = false;
        }
        setModifObjectInfos(true)
    }

    function cancelObjectModif() {
        let list_inputs = document.getElementsByTagName("input")

        for (let i = 0; i < list_inputs.length; i++) {
            list_inputs[i].disabled = true;
        }

        setModifObjectInfos(false)
        // setLoginInput(user.login)
        // setNomInput(user.nom)
        // setPrenomInput(user.prenom)
        // setMailInput(user.mail)
    }

    function sendModifUser(){
        let form_data = new FormData()
        form_data.append("type_objet", type_objet)
        if (type_objet == "modele"){
            form_data.append("id", objectInfos.id)
            form_data.append("nom", objectInfos.nom)
            form_data.append("prenom", objectInfos.prenom)
            form_data.append("genre", objectInfos.genre)
            form_data.append("age", objectInfos.age)
            form_data.append("tarif_horaire", objectInfos.tarif_horaire)

        }else if (type_objet == "article"){
            form_data.append("id", objectInfos.id)
            form_data.append("code_barre", objectInfos.code_barre)
            form_data.append("nom", objectInfos.nom)
            form_data.append("categorie", objectInfos.categorie)
            form_data.append("couleur", objectInfos.couleur)
            form_data.append("taille", objectInfos.taille)

        }else if (type_objet == "atelier"){
            form_data.append("id", objectInfos.id)
            form_data.append("nom", objectInfos.nom)
            form_data.append("type", objectInfos.type)

        }else {
            console.log("Type objet inconnu au batillon !")
        }

        axios.post("./../php/update/updateUserInfo.php", form_data)
            .then(response => {setNewData(response.data)})

        if (newData){
            cancelObjectModif()
        }//else afficher un message erreur modif ne s'est pas faite
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

    let popup = document.getElementsByClassName("PopupObjectInfo")

    if (popup[0] != undefined){
        let popupHeight = popup[0].clientHeight
        positionY = positionY - (popupHeight/1.4)
    }

    return (
        <div className={"PopupObjectInfo popup"} style={{top: positionY + 'px'}}>
            <Button id={"btnClose"} onSmash={popupObjectUnvisible} text={"X"} bgColor={"#ff2828"}/>

            <div className={"containerFormPopUser"}>
                <CreateForm />
                {modifObjectInfos ?
                    <div className={"btnModifPopUpUser"}>
                        <Button id={"btnCancelPopUpUser"} onSmash={cancelObjectModif} text={"Annuler"} bgColor={"red"}/>
                        <Button id={"btnSavePopUpUser"} onSmash={sendModifUser} text={"Enregistrer"}
                                bgColor={"#2882ff"}/>
                    </div>
                    :
                    <div className={"btnModifPopUpUser"}>
                        <Button id={"btnEditPopUpUser"} onSmash={modifObjectAvailable} text={"Modifier"} bgColor={"#2882ff"}/>
                        <Button id={"btnDeletePopUpUser"} onSmash={showDeleteDialog} text={"Supprimer l'utilisateur"} bgColor={"red"}/>
                    </div>}
            </div>

            <dialog id="favDialog">
                <form className={"formDialogPopupUser"} method="dialog">
                    <p>
                        Vous êtes sur le point de supprimer <i>{objectInfos.nom}</i> de la base de donnée.<br/>
                        Êtes-vous sûr ?
                    </p>
                    <menu>
                        <Button id={"cancelBtn"} text={"Annuler"} bgColor={"#2882ff"} onSmash={deleteObject} value={false}/>
                        <Button id={"confirmBtn"} text={"Confirmer"} bgColor={"red"} onSmash={deleteObject} value={true}/>
                    </menu>
                </form>
            </dialog>
        </div>
    )
}

export default PopupObjectInfo