/* librairy import */
import axios from "axios";
import React, { useState } from "react";

/* components import */
import Button from "../Button";

function Inscription(){
    const [loginIsOk, setLoginIsOk] = useState(true)
    const [mdpIsOk, setMdpIsOk] = useState(true)
    const [nomIsOk, setNomIsOk] = useState(true)
    const [prenomIsOk, setPrenomIsOk] = useState(true)
    const [mailIsOk, setMailIsOk] = useState(true)
    // const [mdpIsOk, setMdpIsOk] = useState(false)

    function sendInscription(event){
        event.preventDefault()

        let form = event.currentTarget
        let login = form.elements.login_insc.value
        let mdp = form.elements.mdp_insc.value
        let nom = form.elements.nom.value
        let prenom = form.elements.prenom.value
        let mail = form.elements.mail.value
        let admin = form.elements.admin.checked

        if ((login.length >= 3 && login.length <= 10) && (mdp.length >= 8 && mdp.length <= 30) && nom.length > 0 && prenom.length > 0){
            let form_data = new FormData()
            form_data.append("login", login)
            form_data.append("mdp", mdp)
            form_data.append("nom", nom)
            form_data.append("prenom", prenom)
            form_data.append("mail", mail)
            form_data.append("admin", admin)

            axios.post("./php/connection/inscription.php", form_data)
                .then(response => {
                    console.log("data response:", response.data)
                })

            form.reset()
        }else {
            setLoginIsOk(false)
            setMdpIsOk(false)
            setNomIsOk(false)
            setPrenomIsOk(false)
            setMailIsOk(false)
        }
    }

    return (
        <form className={"formAddUser"} method="post" onSubmit={sendInscription}>
            <div className={"divForm"}>
                <label htmlFor="login">Login :</label>
                <input type="text" id="login_insc" name="user_login" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="password" id="mdp_insc" name="user_mdp" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="user_nom" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" name="user_prenom" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="mail">E-mail :</label>
                <input type="email" id="mail" name="user_mail" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="admin">Admin :</label>
                <input type="checkbox" id="admin" name="user_admin" required={false}/>
            </div>

            <Button type="submit" text={"Inscription"}></Button>
        </form>
    )
}

export default Inscription;