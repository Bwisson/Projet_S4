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

    useEffect(() => {
        function getObjectInfo(){
           let form_data = new FormData()
            form_data.append("id", id_objet)
            form_data.append("type", type_objet)
            axios.post("./php/select/selectObject.php", form_data)
                .then(response => setObjectInfos(response.data))
        }
    }, []);
    
    function createFormObject(){
        if (objectInfos != undefined && objectInfos != null)
            if (objectInfos.legnth > 0) {
                let res = objectInfos.map(info => (
                    <>
                        <div>
                            <label></label>
                            <input type="text"/>
                        </div>
                    </>
                ))
            }
    }

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