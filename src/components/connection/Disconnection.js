import Button from "../Button";
import axios from "axios";

function Disconnection({ connecte, setConnecte }){
    function sendDeconnection(){
        axios.get("./php/connection/disconnect.php")
            .then(response => {
                console.log("deconnexion : ", response.data)
                setConnecte(false)
            })
    }

    return (
        <Button type="button" onSmash={sendDeconnection} text={"Déconnexion"}></Button>
    )
}



export default Disconnection;