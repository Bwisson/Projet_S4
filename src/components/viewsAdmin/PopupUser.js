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
    const [userInfo, setUserInfo] = useState([])

    const [modifUserInfo, setModifUserInfo] = useState(false)
    const [loginInput, setLoginInput] = useState('')
    const [nomInput, setNomInput] = useState('')
    const [prenomInput, setPrenomInput] = useState('')
    const [mailInput, setMailInput] = useState('')
    const [newData, setNewData] = useState(false)

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
                    setUserInfo(data)
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

        setModifUserInfo(false) /* TODO : garder l'ancien texte si une modif a été faites puis annuler */
    }

    function sendModifUser(){
        if ((loginInput.length >= 3 && loginInput.length <= 10)){
            let form_data = new FormData()
            form_data.append("login", loginInput)
            form_data.append("nom", nomInput)
            form_data.append("prenom", prenomInput)
            form_data.append("mail", mailInput)

            // axios.post("./php/connection/inscription.php", form_data)
            //     .then(response => {setNewData(response.data)})

            if (newData){
                cancelUserModif()
            }//else afficher un message erreur modif ne s'est pas faite
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
                        <input type="text" value={loginInput}  onChange={e => setLoginInput(e.target.value)} disabled={true}/>
                    </div>

                    <div className={"divFormPopUser"}>
                        <label htmlFor="nom">Nom : </label>
                        <input type="text" value={nomInput} onChange={e => setNomInput(e.target.value)} disabled={true}/>
                    </div>

                    <div className={"divFormPopUser"}>
                        <label htmlFor="login">Prénom : </label>
                        <input type="text" value={prenomInput} onChange={e => setPrenomInput(e.target.value)} disabled={true}/>
                    </div>

                    <div className={"divFormPopUser"}>
                        <label htmlFor="login">Mail : </label>
                        <input type="text" value={mailInput} onChange={e => setMailInput(e.target.value)} disabled={true}/>
                    </div>
                </form>
                {modifUserInfo ?
                    <div className={"btnModifPopUpUser"}>
                        <Button id={"btnModifierPopUpUser"} onSmash={cancelUserModif} text={"Annuler"} bgColor={"red"}/>
                        <Button id={"btnModifierPopUpUser"} onSmash={sendModifUser} text={"Enregistrer"} bgColor={"#2882ff"}/>
                    </div>

                    :<Button id={"btnModifierPopUpUser"} onSmash={modifUserAvailable} text={"Modifier"} bgColor={"#2882ff"}/>}

            </div>

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