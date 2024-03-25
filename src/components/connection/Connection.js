/* Librairy imports */
import React, {useState} from "react";
import axios from "axios";

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssConnection/Connection.scss"


function Connection({ setAdmin, setConnecte }){
    const [loginIsOk, setLoginIsOk] = useState( true)
    const [mdpIsOk, setMdpIsOk] = useState(true)

    function verifInputs(login, mdp){
        let res = true

        if (login.length < 3 && login.length > 10){
            res = false
            setLoginIsOk(false)
        }

        if (mdp.length < 8 && mdp.length > 10){
            res = false
            setMdpIsOk(false)
        }

        return res
    }

    function sendConnection(event){
        event.preventDefault()

        let form = event.currentTarget
        let login = form.elements.login.value
        let mdp = form.elements.mdp.value

        if (verifInputs(login, mdp)){
            let form_data = new FormData()
            form_data.append("login", login)
            form_data.append("mdp", mdp)

            axios.post("./php/connection/connection.php", form_data)
                .then(response => {
                    let data = response.data
                    setConnecte(data.connecte)
                    setAdmin(data.admin)
                })

            form.reset()
        }

    }

    return (
        <form className={"form"} method="post" onSubmit={sendConnection}>
            <div className={"divForm"}>
                <label htmlFor="login">Login :</label>
                <input type="text" id="login" name="user_login" required={true}/>
                {!loginIsOk && <p>Login incorrect !</p>}
            </div>

            <div className={"divForm"}>
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="password" id="mdp" name="user_mdp" required={true}/>
                {!mdpIsOk && <p>Mot de passe incorrect !</p>}
            </div>
            <Button type="submit" text={"Connexion"}></Button>
        </form>
    )
}

export default Connection;