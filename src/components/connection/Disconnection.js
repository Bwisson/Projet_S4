import Button from "../Button";
import axios from "axios";

function Disconnection({connecte}){
    function sendDeconnection(){
        axios.get("./php/connection/disconnect.php")
            .then(response => console.log("deconnexion : ", response.data))
    }

    function testOnClick(){
        console.log("click !")
    }
    if(connecte) {
        return <Button onClick={testOnClick} text={"Déconnexion"}></Button>
    }
}



export default Disconnection;