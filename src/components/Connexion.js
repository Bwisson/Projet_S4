import Button from "./Button";

function Connexion(){
    return (
        <form className={"connectionForm"} action="" method="post">
            <div className={"divConnForm"}>
                <label htmlFor="login">Login:</label>
                <input type="text" id="login" name="user_login"/>
            </div>

            <div className={"divConnForm"}>
                <label htmlFor="mdp">E-mail&nbsp;:</label>
                <input type="password" id="mdp" name="user_mdp"/>
            </div>
            <Button text={"Connexion"}></Button>
        </form>
    )
}

export default Connexion;