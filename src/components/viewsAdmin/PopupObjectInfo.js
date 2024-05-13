import {useEffect, useState} from "react";
import axios from 'axios'

/* components imports */
import Button from "../Button";
import PopupUser from "./PopupUser";

/* css imports */
import "../../css/cssViewsAdmin/PopUpUser.scss"
import "../../css/cssViewsAdmin/PopupObjectInfo.scss"


function PopupObjectInfo({id_objet, type_objet, setPopupObjectVisible}){
    const [objectInfo, setObjectInfo] = useState([])

    useEffect(() => {
        function getObjectInfo(){
            if(type_objet == "article"){
                axios.post("",)
                    .then(response => setObjectInfo(response.data))
            }else if (type_objet == "atelier"){
                axios.post("",)
                    .then(response => setObjectInfo(response.data))
            }else if (type_objet == "modele"){
                axios.post("",)
                    .then(response => setObjectInfo(response.data))
            }else {
                console.log("type d'objet inconnu")
            }
        }
    }, []);

    function popupObjectUnvisible(){
        setPopupObjectVisible(false)
    }

    return(
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
                        <Button id={"btnCancelPopUpUser"} onSmash={cancelUserModif} text={"Annuler"} bgColor={"red"}/>
                        <Button id={"btnSavePopUpUser"} onSmash={sendModifUser} text={"Enregistrer"}
                                bgColor={"#2882ff"}/>
                    </div>
                    :
                    <div className={"btnModifPopUpUser"}>
                        <Button id={"btnEditPopUpUser"} onSmash={modifUserAvailable} text={"Modifier"}
                                bgColor={"#2882ff"}/>
                        <Button id={"btnDeletePopUpUser"} onSmash={showDeleteDialog} text={"Supprimer l'utilisateur"}
                                bgColor={"red"}/>
                    </div>}
            </div>
        </div>
    )
}

export default PopupObjectInfo