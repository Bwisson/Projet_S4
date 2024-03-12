import Button from "../Button";
import axios from "axios";

function sendInscription(event){
    event.preventDefault()

    let form = event.currentTarget
    let login = form.elements.login_insc.value
    let mdp = form.elements.mdp_insc.value
    let nom = form.elements.nom.value
    let prenom = form.elements.prenom.value
    let mail = form.elements.mail.value
    let admin = form.elements.admin.checked

    if (login.length > 0 && login.length <= 0 && mdp.length > 0 && mdp.length <= 30 && nom.length > 0 && prenom.length > 0 && mail.length > 0){
        let form_data = new FormData()
        form_data.append("login", login)
        form_data.append("mdp", mdp)
        form_data.append("nom", nom)
        form_data.append("prenom", prenom)
        form_data.append("mail", mail)
        form_data.append("admin", admin)
    
        console.log(login, mdp, nom, prenom, mail, admin)
        axios.post("./php/connection/inscription.php", form_data)
            .then(response => {
                console.log("data response:", response.data)
            })
    }
    else {
        console.log("Champ(s) invalide(s)")
    }
    form.reset()
}

function Inscription(){

    return (
        <form className={"form"} method="post" onSubmit={sendInscription}>
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