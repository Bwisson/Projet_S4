/* Library imports */

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/PopUpUser.scss"

const resas = [
    {"code_barre" : "0025873", "nom" : "pinceau", "date_emprunt" : "2024-03-06", "date_retour" : "2024-03-07"},
    {"code_barre" : "0025873", "nom" : "pinceau", "date_emprunt" : "2024-03-06", "date_retour" : "2024-03-07"},
    {"code_barre" : "0025873", "nom" : "pinceau", "date_emprunt" : "2024-03-06", "date_retour" : "2024-03-07"},
    {"code_barre" : "0025873", "nom" : "pinceau", "date_emprunt" : "2024-03-06", "date_retour" : "2024-03-07"},
    {"code_barre" : "0025873", "nom" : "pinceau", "date_emprunt" : "2024-03-06", "date_retour" : "2024-03-07"}
]



function PopUpUser({id, setShowPopUp}) {
    function List() {
        const list_resas = resas.map(resas =>
            <tr>
                <td>{resas.code_barre}</td>
                <td>{resas.nom}</td>
                <td>{resas.date_emprunt}</td>
                <td>{resas.date_retour}</td>
            </tr>
        );

        return list_resas
    }

    function hidePopUp(){
        return setShowPopUp(false)
    }
    console.log(id)
    return (
        <div className="PopUpUser">
            <Button onSmash={hidePopUp} text={"X"} bgColor={"#ff2828"}/>
            <table>
                <thead>
                <tr>
                    <th scope="col">Code barre</th>
                    <th scope="col">Objet</th>
                    <th scope="col">Date d'emprunt</th>
                    <th scope="col">Date de retour</th>
                </tr>
                </thead>
                <tbody>
                    <List/>
                </tbody>
            </table>
        </div>
    )
}

export default PopUpUser;