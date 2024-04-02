/*Librairy imports */
import axios from "axios";

/*components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/formAddObject.scss"


function CreateAtelier({ setNewData, setShowingFormAddModele }){

    function createAtelier(event){
        event.preventDefault()

        let form = event.currentTarget
        let nom = form.elements.nom.value
        let prenom = form.elements.prenom.value
        let genre = form.elements.genre_select.value
        let age = form.elements.age.value
        let tarif_horaire = form.elements.tarif_horaire.value

        let form_data = new FormData()
        form_data.append("nom", nom)
        form_data.append("prenom", prenom)
        form_data.append("genre", genre)
            form_data.append("age", age)
            form_data.append("tarif_horaire", tarif_horaire)

        axios.post("./php/create/createModele.php", form_data)
            .then(response => setNewData(response.data))

        form.reset()
        setShowingFormAddModele(false)
    }

    return (
        <form className={"formAddObject"} method="post" onSubmit={createAtelier}>
            <div className={"divForm"}>
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="genre_select">Genre :</label>
                <select name="genre" id="genre_select">
                    <option value="">-- Choisir le genre --</option>
                    <option value="femme">Femme</option>
                    <option value="homme">Homme</option>
                </select>
            </div>

            <div className={"divForm"}>
                <label htmlFor="age">Âge :</label>
                <input type="number" id="age" name="age" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="tarif_horaire">tarif horaire :</label>
                <input type="number" id="tarif_horaire" name="tarif_horaire" required={true}/>
            </div>

            <Button type="submit" text={"Ajouter"}/>
        </form>
    )
}

export default CreateAtelier;