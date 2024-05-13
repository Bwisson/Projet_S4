/* Library imports */
import {useEffect,useState} from "react";
import axios from "axios"

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/PopUpUser.scss"
import {translateRect} from "@fullcalendar/core/internal";

function PopupUser({id, setShowPopUp, positionY}) {
    const [listResasArticles, setListResasArticles] = useState([])
    const [listResasAteliers, setListResasAteliers] = useState([])
    const [listResasModeles, setListResasModeles] = useState([])

    const [user, setUser] = useState([])
    const [modifUserInfo, setModifUserInfo] = useState(false)

    const [loginInput, setLoginInput] = useState('')
    const [nomInput, setNomInput] = useState('')
    const [prenomInput, setPrenomInput] = useState('')
    const [mailInput, setMailInput] = useState('')

    const [newData, setNewData] = useState(false)
    const [delUser, setDelUser] = useState(false)

    useEffect(() => {
        function getUserResas(){
            let form_data = new FormData()
            form_data.append("id", id)

            axios.post("./php/list/listUserResas.php", form_data)
                .then(response => {
                    let data = response.data
                    setListResasArticles(data.articles)
                    setListResasAteliers(data.ateliers)
                    setListResasModeles(data.modeles)
                })
        }
        function getUserInfo(){
            let form_data = new FormData()
            form_data.append("id", id)

            axios.post("./php/select/selectUser.php", form_data)
                .then(response => {
                    let data = response.data
                    setUser(data)
                    setLoginInput(data.login)
                    setNomInput(data.nom)
                    setPrenomInput(data.prenom)
                    setMailInput(data.mail)
                })
        }

        getUserResas()
        getUserInfo()
    }, [id]);


    function MapResasArticles(){
        let res = <p>Aucune réservations</p>
        if (listResasArticles.length != 0) {
            const list_resas = listResasArticles.map(resa =>
                <tr>
                    <td>{resa.code_barre}</td>
                    <td>{resa.nom}</td>
                    <td>{new Date(resa.start).toLocaleDateString()}</td>
                    <td>{new Date(resa.end).toLocaleDateString()}</td>
                    <td>{resa.categorie}</td>
                    <td>{resa.categorie}</td>
                    <td>{resa.taille}</td>
                </tr>
            );
            res =
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Code barre</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Début</th>
                        <th scope="col">Fin</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Couleur</th>
                        <th scope="col">Taille</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list_resas}
                    </tbody>
                </table>
        }
        return res
    }

    function MapResasAteliers(){
        let res = <p>Aucune réservations</p>
        if (listResasAteliers.length != 0) {
            const list_resas = listResasAteliers.map(resa =>
                <tr>
                    <td>{resa.nom}</td>
                    <td>{new Date(resa.start).toLocaleDateString()}</td>
                    <td>{new Date(resa.end).toLocaleDateString()}</td>
                    <td>{resa.type}</td>
                </tr>
            );
            res =
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Début</th>
                        <th scope="col">Fin</th>
                        <th scope="col">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list_resas}
                    </tbody>
                </table>
        }
        return res
    }

    function MapResasModeles(){
        let res = <p>Aucune réservations</p>
        if (listResasModeles.length != 0) {
            const list_resas = listResasModeles.map(resa =>
                <tr>
                    <td>{resa.nom}</td>
                    <td>{resa.prenom}</td>
                    <td>{new Date(resa.start).toLocaleDateString()}</td>
                    <td>{new Date(resa.end).toLocaleDateString()}</td>
                    <td>{resa.genre}</td>
                    <td>{resa.age}</td>
                    <td>{resa.tarif_horaire}</td>
                </tr>
            );
            res =
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Début</th>
                        <th scope="col">Fin</th>
                        <th scope="col">Âge</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Tarif</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list_resas}
                    </tbody>
                </table>
        }
        return res
    }

    function hidePopUp() {
        return setShowPopUp(false)
    }

    function modifUserAvailable(){
        let list_inputs = document.getElementsByTagName("input")

        for (let i = 0; i < list_inputs.length; i++) {
            list_inputs[i].disabled = false;
        }
        setModifUserInfo(true)
    }

    function cancelUserModif(){
        let list_inputs = document.getElementsByTagName("input")

        for (let i = 0; i < list_inputs.length; i++) {
            list_inputs[i].disabled = true;
        }

        setModifUserInfo(false)
        setLoginInput(user.login)
        setNomInput(user.nom)
        setPrenomInput(user.prenom)
        setMailInput(user.mail)
    }

    function sendModifUser(){
        if ((loginInput.length >= 3 && loginInput.length <= 10)){
            let form_data = new FormData()
            form_data.append("id", user.id)
            form_data.append("login", loginInput)
            form_data.append("mdp", user.mdp)
            form_data.append("nom", nomInput)
            form_data.append("prenom", prenomInput)
            form_data.append("mail", mailInput)
            form_data.append("admin", user.admin)

            axios.post("./../php/update/updateUserInfo.php", form_data)
                .then(response => {setNewData(response.data)})

            if (newData){
                cancelUserModif()
            }//else afficher un message erreur modif ne s'est pas faite
        }
    }

    function showDeleteDialog(){
        let dialog = document.getElementById("favDialog")
        dialog.showModal();
    }
    function deleteUser(e){
        setDelUser(e.target.value)
        /* TODO : supprimer toutes ses données résas + demandes d'annualtions */
        if (delUser){
            let form_data = new FormData()
            form_data.append("id", user.id)

            axios.post("./php/delete/deleteUser.php", form_data)
                .then(response => setDelUser(response.data))
        }
    }

    let popup = document.getElementsByClassName("PopUpUser")

    if(popup[0] != undefined){
        let popupHeight = popup[0].clientHeight
        positionY = positionY - (popupHeight/1.4)
    }

    return (
        <div className="PopUpUser" style={{top: positionY + 'px'}}>
            <Button id={"btnClose"} onSmash={hidePopUp} text={"X"} bgColor={"#ff2828"}/>

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
                        <Button id={"btnEditPopUpUser"} onSmash={modifUserAvailable} text={"Modifier"} bgColor={"#2882ff"}/>
                        <Button id={"btnDeletePopUpUser"} onSmash={showDeleteDialog} text={"Supprimer l'utilisateur"} bgColor={"red"}/>
                    </div>}
            </div>

            <dialog id="favDialog">
                <form className={"formDialogPopupUser"} method="dialog">
                    <p>
                        Vous êtes sur le point de supprimer {user.nom}, {user.prenom} de la base de donnée.<br/>
                        Êtes-vous sûr ?
                    </p>
                    <menu>
                        <Button id={"cancelBtn"} text={"Annuler"} bgColor={"#2882ff"} onSmash={deleteUser} value={false}/>
                        <Button id={"confirmBtn"} text={"Confirmer"} bgColor={"red"} onSmash={deleteUser} value={true}/>
                    </menu>
                </form>
            </dialog>

            <div className={"titleTab"}>
                <h2>Articles</h2>
                <MapResasArticles/>
            </div>

            <div className={"titleTab"}>
                <h2>Ateliers</h2>
                <MapResasAteliers/>
            </div>

            <div className={"titleTab"}>
                <h2>Modèles</h2>
                <MapResasModeles/>
            </div>
        </div>
    )
}

export default PopupUser;