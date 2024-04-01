/*Librairy imports */
import axios from "axios";

/*components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/CreateArticle.scss"


function CreateAtelier({ setNewData, setShowingFormAddAtelier }){

    function createAtelier(event){
        event.preventDefault()

        let form = event.currentTarget
        let nom = form.elements.nom.value
        let type = form.elements.type_select.value

        let form_data = new FormData()
        form_data.append("nom", nom)
        form_data.append("type", type)

        axios.post("./php/create/createAtelier.php", form_data)
            .then(response => setNewData(response.data))

        form.reset()
        setShowingFormAddAtelier(false)
    }

    return (
        <form className={"form"} method="post" onSubmit={createAtelier}>
            <div className={"divForm"}>
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required={true}/>
            </div>

            <div className={"divForm"}>
                <label htmlFor="type_select">Type d'atelier :</label>
                <select name="type" id="type_select">
                    <option value="">-- Choisir le type d'atelier --</option>
                    <option value="photographie">Photographie</option>
                    <option value="peinture">Peinture</option>
                    <option value="sculputure">Sculpture</option>
                </select>
            </div>

            <Button type="submit" text={"Ajouter"} />
        </form>
    )
}

export default CreateAtelier;