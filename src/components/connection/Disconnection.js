/* Librairy imports */
import axios from "axios";
import { Link } from "react-router-dom"

/* components imports */
import Button from "../Button";


function Disconnection({ connecte, setConnecte }){
    function sendDeconnection(){
        axios.get("./php/connection/disconnect.php")
            .then(response => {
                setConnecte(false)
            })
    }

    return (
        <>
            <Link to={"info7/"}> <Button type="button" onSmash={sendDeconnection} text={"Déconnexion"}></Button></Link>
        </>

    )
}


export default Disconnection;