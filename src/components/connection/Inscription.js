/* librairy import */
import axios from "axios";
import React, { useState } from "react";

/* components import */
import Button from "../Button";

/* css imports */
import "../../css/form.scss"

function Inscription(){
    const [login, setLogin] = useState( '')
    const [mdp, setMdp] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [mail, setMail] = useState('')
    const [admin, setAdmin] = useState(false)

    const [loginIsOk, setLoginIsOk] = useState(false)
    const [mdpIsOk, setMdpIsOk] = useState(false)

    function sendInscription(event){
        event.preventDefault()
        let form = event.currentTarget
        // let admin = form.elements.admin.checked

        if ((login.length >= 3 && login.length <= 10) && (mdp.length >= 8 && mdp.length <= 30)){
            let form_data = new FormData()
            form_data.append("login", login)
            form_data.append("mdp", mdp)
            form_data.append("nom", nom)
            form_data.append("prenom", prenom)
            form_data.append("mail", mail)
            form_data.append("admin", admin)

            axios.post("./php/connection/inscription.php", form_data)
                .then(response => {console.log("data response:", response.data)})
            this.setState({
                login: "",
                mdp: "",
                nom: "",
                prenom: "",
                mail: ""
            })
        }
    }

    function showTextInvalidLogin(){
        if (login.length < 3 || login.length > 10){
            setLoginIsOk(true)
        }else {
            setLoginIsOk(false)
        }
    }

    function showTextInvalidMdp(){
        if (mdp.length < 8){
            setMdpIsOk(true)
        }else {
            setMdpIsOk(false)
        }
    }

    return (
        <form className={"formAddUser"} method="post" onSubmit={sendInscription}>
            <div className={"divForm"}>
                <label htmlFor="login">Login :</label>
                <input type="text" id="login_insc" name="user_login" value={login} onBlur={showTextInvalidLogin} onChange={e => setLogin(e.target.value)}/>
                {loginIsOk && <p className={"formError"}>Le login doit faire 3 caractères minimum et 10 caractères maximum</p>}
            </div>

            <div className={"divForm"}>
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="password" id="mdp_insc" name="user_mdp" value={mdp} onBlur={showTextInvalidMdp} onChange={e => setMdp(e.target.value)}/>
                {mdpIsOk && <p className={"formError"}>Le mot de passe doit faire 8 caractères minimum et 30 caractères minimum</p>}
            </div>

            <div className={"divForm"}>
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="user_nom" required={true} value={nom} onChange={e => setNom(e.target.value)}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" name="user_prenom" required={true} value={prenom} onChange={e => setPrenom(e.target.value)}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="mail">E-mail :</label>
                <input type="email" id="mail" name="user_mail" required={true} value={mail} onChange={e => setMail(e.target.value)}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="admin">Admin :</label>
                <input type="checkbox" id="admin" name="user_admin" onChange={e => setAdmin(e.target.checked)}/>
            </div>

            <Button type="submit" text={"Inscription"}></Button>
        </form>
    )
}

export default Inscription;