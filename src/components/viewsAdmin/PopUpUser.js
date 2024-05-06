/* Library imports */
import {useEffect,useState} from "react";
import axios from "axios"

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/PopUpUser.scss"

function PopUpUser({id, setShowPopUp, positionY}) {
    const [listResasArticles, setListResasArticles] = useState([])
    const [listResasAteliers, setListResasAteliers] = useState([])
    const [listResasModeles, setListResasModeles] = useState([])

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

        getUserResas()
    }, [id]);


    function MapResasArticles(){
        let res = <p>Acune réservations</p>
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
        let res = <p>Acune réservations</p>
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
        let res = <p>Acune réservations</p>
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
        positionY = positionY - popupHeight
    }

    return (
        <div className="PopUpUser" style={{top: positionY + 'px'}}>
            <Button onSmash={hidePopUp} text={"X"} bgColor={"#ff2828"}/>
            <h2>Articles</h2>
            <MapResasArticles/>

            <h2>Ateliers</h2>
            <MapResasAteliers/>

            <h2>Modèles</h2>
            <MapResasModeles/>
        </div>
    )
}

export default PopUpUser;