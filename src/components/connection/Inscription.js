import Button from "../Button";
import axios from "axios";

function sendInscription(event){
    event.preventDefault()

    let form = event.currentTarget
    let login = form.elements.login.value
    let mdp = form.elements.mdp.value

    let form_data = new FormData
    form_data.append("login", login)
    form_data.append("mdp", mdp)

    axios.post("./php/Connection/connection.php", form_data)
        .then(response => {
            console.log("data response:", response.data)
        })
    form.reset()
}

function Inscription(){

    return (
        <form className={"form"} method="post" onSubmit={sendInscription}>
            <div className={"divForm"}>
                <label htmlFor="login">Login :</label>
                <input type="text" id="login" name="user_login" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="password" id="mdp" name="user_mdp" required={true}/>
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
                <input type="checkbox" id="admin" name="user_admin" required={true}/>
            </div>

            <Button type="submit" text={"Inscription"}></Button>
        </form>
    )
}

export default Inscription;