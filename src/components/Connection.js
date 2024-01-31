import Button from "./Button";
import axios from "axios";

function sendConnection(event){
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

function Connection(){

    return (
        <form className={"connectionForm"} method="post" onSubmit={sendConnection}>
            <div className={"divConnForm"}>
                <label htmlFor="login">Login :</label>
                <input type="text" id="login" name="user_login" required={true}/>
            </div>

            <div className={"divConnForm"}>
                <label htmlFor="mdp">E-mail :</label>
                <input type="password" id="mdp" name="user_mdp" required={true}/>
            </div>
            <Button type="submit" text={"Connexion"}></Button>
        </form>
    )
}

export default Connection;