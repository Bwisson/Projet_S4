/* Librairy imports */
import React, {useEffect, useState} from "react";
import axios from "axios";

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssConnection/Connection.scss"
import "../../css/form.scss"


function Connection({ setAdmin,  setIsConnect }){
    const [login, setLogin] = useState('')
    const [mdp, setMdp] = useState('')

    const [invalidLogin, setInvalidLogin] = useState(false)
    const [invalidMdp, setInvalidMdp] = useState(false)

    const [wrongLogin, setWrongLogin] = useState(false)
    const [wrongMdp, setWrongMdp] = useState(false)

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
                    setIsConnect(data.connecte)
                    setAdmin(data.admin)
                    setWrongLogin(!(data.login))
                    setWrongMdp(!(data.mdp))
                    console.log(data)
                })
            form.reset()
        }
    }

    function showTextInvalidLogin(){
        if (login.length < 3 || login.length > 10){
            setInvalidLogin(true)
        }else {
            setInvalidLogin(false)
        }
    }

    function showTextInvalidMdp(){
        if (mdp.length < 8){
            setInvalidMdp(true)
        }else {
            setInvalidMdp(false)
        }
    }

    return (
        <form className={"formConnection"} method="post" onSubmit={sendConnection}>
            <div className={"divForm"}>
                <label htmlFor="login">Login :</label>
                <input type="text" id="login" name="user_login" required={true} value={login} onBlur={showTextInvalidLogin} onChange={e => setLogin(e.target.value)}/>
                {invalidLogin && <p className={"formError"}>Attention le login est compris entre 3 et 10 charactères !</p>}
            </div>

            <div className={"divForm"}>
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="password" id="mdp" name="user_mdp" required={true} value={mdp} onBlur={showTextInvalidMdp} onChange={e => setMdp(e.target.value)}/>
                {invalidMdp && <p className={"formError"}>Attention le mot de passe doit faire minimum 8 charactères !</p>}
            </div>
            {wrongLogin && <p className={"formError"}>Login inexistant</p>}
            {wrongMdp && <p className={"formError"}>Mauvais mot de passe</p>}
            <Button type="submit" text={"Connexion"}/>
        </form>
    )
}

export default Connection;