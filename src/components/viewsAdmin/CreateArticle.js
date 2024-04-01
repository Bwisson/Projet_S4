/*Librairy imports */
import axios from "axios";

/*components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/CreateArticle.scss"


function CreateArticle({ setNewData, setShowingFormAddArticle }){

    function createArticle(event){
        event.preventDefault()

        let form = event.currentTarget
        let code_barre = form.elements.code_barre.value
        let nom = form.elements.nom.value
        let categorie = form.elements.categorie_select.value
        let couleur = form.elements.couleur.value
        let taille = form.elements.taille_select.value

        let form_data = new FormData()
        form_data.append("code_barre", code_barre)
        form_data.append("nom", nom)
        form_data.append("categorie", categorie)
        form_data.append("couleur", couleur)
        form_data.append("taille", taille)

        axios.post("./php/create/createArticle.php", form_data)
            .then(response => setNewData(response.data))

        form.reset()
        setShowingFormAddArticle(false)
    }

    return (
        <form className={"form"} method="post" onSubmit={createArticle}>
            <div className={"divForm"}>
                <label htmlFor="code_barre">Code barre :</label>
                <input type="text" id="code_barre" name="code_barre" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="categorie_select">Catégorie :</label>
                <select name="categorie" id="categorie_select">
                    <option value="">-- Choisir une catégorie --</option>
                    <option value="chevalet">Chevalet</option>
                    <option value="pinceaux_outils">Pinceaux et outils de peinture</option>
                </select>
            </div>

            <div className={"divForm"}>
                <label htmlFor="couleur">Couleur :</label>
                <input type="text" id="couleur" name="couleur" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="taille_select">Taille :</label>
                <select name="taille" id="taille_select">
                    <option value="U">U</option>
                    <option value="petit">petit</option>
                    <option value="moyen">moyen</option>
                    <option value="grand">grand</option>
                </select>
            </div>

            <Button type="submit" text={"Ajouter"} />
        </form>
    )
}

export default CreateArticle;