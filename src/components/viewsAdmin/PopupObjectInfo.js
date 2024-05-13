import {useEffect, useState} from "react";
import axios from 'axios'

/* components imports */
import Button from "../Button";
import PopupUser from "./PopupUser";

/* css imports */
import "../../css/cssViewsAdmin/PopUpUser.scss"
import "../../css/cssViewsAdmin/PopupObjectInfo.scss"


function PopupObjectInfo({id_objet, type_objet, setPopupObjectVisible}){
    const [objectInfos, setObjectInfos] = useState([])

    const [modifObjectInfos, setModifObjectInfos] = useState(false)
    const [newData, setNewData] = useState(false)

    useEffect(() => {
        function getObjectInfo(){
           let form_data = new FormData()
            form_data.append("id", id_objet)
            form_data.append("type", type_objet)
            axios.post("./php/select/selectObject.php", form_data)
                .then(response => setObjectInfos(response.data))
        }
    }, []);

    function popupObjectUnvisible() {
        setPopupObjectVisible(false)
    }

    function createFormModele(){
        if (objectInfos != undefined && objectInfos != null)
            if (objectInfos.legnth > 0) {
                let res =
                    <div className={"containerFormPopUser"}>
                        <form className={"formPopUser"}>
                            <div>
                                <label htmlFor={"nom"}>Nom : </label>
                                <input id="nom" type="text" value={objectInfos.nom} disabled={true}/>
                            </div>
                            <div>
                                <label htmlFor={"prenom"}>Prénom : </label>
                                <input id="prenom" type="text" value={objectInfos.prenom} disabled={true}/>
                            </div>
                            <div>
                                <label id="genre" htmlFor={"genre"}>Genre : </label>
                                <select name="" id="select-genre">
                                    <option value="">-- choisir une option --</option>
                                    <option value="femme">femme</option>
                                    <option value="homme">Homme</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={"age"}>Âge : </label>
                                <input id="age" type="number" value={objectInfos.age} disabled={true}/>
                            </div>
                            <div>
                                <label htmlFor={"tarif_horaire"}>Tarif horaire : </label>
                                <input id="tarif_horaire" type="number" value={objectInfos.tarif_horaire}
                                       disabled={true}/>
                            </div>
                        </form>
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
            }
    }

    function modifObjectAvailable(){
        let list_inputs = document.getElementsByTagName("input")

        for (let i = 0; i < list_inputs.length; i++) {
            list_inputs[i].disabled = false;
        }
        setModifObjectInfos(true)
    }

    function cancelObjectModif(){
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


    return (
        <div className={"PopupObjectInfo PopUpUser"}>
            <Button id={"btnClose"} onSmash={popupObjectUnvisible} text={"X"} bgColor={"#ff2828"}/>

            <div className={"containerFormPopUser"}>
                <form className={"formPopUser"}>
                    <div className={"divFormPopUser"}>
                        <label htmlFor="login">Login : </label>
                        <input type="text" value={loginInput} onChange={e => setLoginInput(e.target.value)}
                               disabled={true}/>
                    </div>

                    <div className={"divFormPopUser"}>
                        <label htmlFor="nom">Nom : </label>
                        <input type="text" value={nomInput} onChange={e => setNomInput(e.target.value)}
                               disabled={true}/>
                    </div>

                    <div className={"divFormPopUser"}>
                        <label htmlFor="login">Prénom : </label>
                        <input type="text" value={prenomInput} onChange={e => setPrenomInput(e.target.value)}
                               disabled={true}/>
                    </div>

                    <div className={"divFormPopUser"}>
                        <label htmlFor="login">Mail : </label>
                        <input type="text" value={mailInput} onChange={e => setMailInput(e.target.value)}
                               disabled={true}/>
                    </div>
                </form>
                {modifUserInfo ?
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
        </div>
    )
}

export default PopupObjectInfo