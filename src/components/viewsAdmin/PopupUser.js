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

    let popup = document.getElementsByClassName("PopUpUser")

    if(popup[0] != undefined){
        let popupHeight = popup[0].clientHeight
        positionY = positionY - (popupHeight/1.4)
    }

    console.log(userInfo)
    return (
        <div className="PopUpUser" style={{top: positionY + 'px'}}>
            <Button onSmash={hidePopUp} text={"X"} bgColor={"#ff2828"}/>
            <form>
                <label htmlFor="login">Login :</label>
                <input type="text" value={userInfo.login} disabled={true}/>

                <label htmlFor="nom">Nom :</label>
                <input type="text" value={userInfo.nom} disabled={true}/>

                <label htmlFor="login">Prénom :</label>
                <input type="text" value={userInfo.prenom} disabled={true}/>

                <label htmlFor="login">Mail :</label>
                <input type="text" value={userInfo.mail} disabled={true}/>
            </form>


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