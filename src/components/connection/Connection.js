import Button from "../Button";
import axios from "axios";



function Connection({ connecte, setConnecte }){

    function sendConnection(event){
        event.preventDefault()

        let form = event.currentTarget
        let login = form.elements.login.value
        let mdp = form.elements.mdp.value

        let form_data = new FormData()
        form_data.append("login", login)
        form_data.append("mdp", mdp)

        // axios.post("./php/connection/connection.php", form_data)
        //     .then(response => {
        //         let data = response.data
        //         setConnecte(data)
        //     })

        form.reset()
    }

    return (
        <form className={"form"} method="post" onSubmit={sendConnection}>
            <div className={"divForm"}>
                <label htmlFor="login">Login :</label>
                <input type="text" id="login" name="user_login" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="password" id="mdp" name="user_mdp" required={true}/>
            </div>
            <Button type="submit" text={"Connexion"}></Button>
        </form>
    )
}

export default Connection;