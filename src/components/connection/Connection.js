/* Librairy imports */
import React, {useState} from "react";
import axios from "axios";

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssConnection/Connection.scss"


function Connection({ setAdmin, setConnecte }){
    const [login, setLogin] = useState( '')
    const [mdp, setMdp] = useState('')

    function verifInputs(login, mdp){
        let res = true

        if (login.length < 3 && login.length > 10){
            res = false
        }

        if (mdp.length < 8 && mdp.length > 10){
            res = false
        }

        return res
    }

    function sendConnection(event){
        event.preventDefault()
        let form = event.currentTarget

        if ((login.length >= 3 && login.length <= 10)){
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
                <input type="text" id="login" name="user_login" required={true} value={login} onChange={e => setLogin(e.target.value)}/>
                {(login.length < 3 || login.length > 10) && <p className={"formError"}>Attention le login est compris entre 3 et 10 charactères !</p>}
            </div>

            <div className={"divForm"}>
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="password" id="mdp" name="user_mdp" required={true} value={mdp} onChange={e => setMdp(e.target.value)}/>
                {(mdp.length < 8) && <p className={"formError"}>Attention le mot de passe doit faire minimum 8 charactères !</p>}
            </div>
            <Button type="submit" text={"Connexion"}></Button>
        </form>
    )
}

export default Connection;