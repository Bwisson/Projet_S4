/* Librairy imports */
import React from "react";

/* components imports */
import Button from "../Button";

/* css imports */
import '../../css/cssViewsAdmin/ViewObjects.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'



const modeles = [
    {"nom" : "tcha", "prenom" : "jonathan", "genre" : "homme", "age" : 20, "tarif_horaire" : 50},
    {"nom" : "tcha", "prenom" : "jonathan", "genre" : "homme", "age" : 20, "tarif_horaire" : 20}
]

const ateliers = [
    {"nom" : "chartreuse", "type" : "photographie"},
    {"nom" : "nivolet", "type" : "sculpture"}
]

const objets = [
    {"code_barre" : "0025873", "nom" : "pinceau", "categorie" : "pinceaux_outils", "couleur" : "marron", "taille" : "petit"},
    {"code_barre" : "0025873", "nom" : "chevalet", "categorie" : "pinceaux_outils", "couleur" : "jaune", "taille" : "grand"}
]

function ViewObjects() {

    function ListModeles(){
        const list_modeles = modeles.map(modele =>
            <tr>
                <td>{modele.nom}</td>
                <td>{modele.prenom}</td>
                <td>{modele.genre}</td>
                <td>{modele.age}</td>
                <td>{modele.tarif_horaire} €</td>
                {/*<td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>*/}
            </tr>
        );

        return list_modeles
    }

    function ListAteliers(){
        const list_ateliers = ateliers.map(atelier =>
            <tr>
                <td>{atelier.nom}</td>
                <td>{atelier.type}</td>
                {/*<td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>*/}
            </tr>
        );

        return list_ateliers
    }

    function ListObjets(){
        const list_objets = objets.map(objet =>
            <tr>
                <td>{objet.code_barre}</td>
                <td>{objet.nom}</td>
                <td>{objet.categorie}</td>
                <td>{objet.couleur}</td>
                <td>{objet.taille}</td>
                {/*<td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>*/}
            </tr>
        );

        return list_objets
    }

    return (
        <div className="ViewObjects">
            <table>
                <caption>
                    Modèles
                </caption>
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Âge</th>
                    <th scope="col">Tarif horaire</th>
                </tr>
                </thead>
                <tbody>
                <ListModeles/>
                </tbody>
            </table>
            <table>
                <caption>
                    Ateliers
                </caption>
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Type</th>
                </tr>
                </thead>
                <tbody>
                <ListAteliers/>
                </tbody>
            </table>
            <table>
                <caption>
                    Objets
                </caption>
                <thead>
                <tr>
                    <th scope="col">Code barre</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Catégorie</th>
                    <th scope="col">Couleur</th>
                    <th scope="col">Taille</th>
                </tr>
                </thead>
                <tbody>
                <ListObjets/>
                </tbody>
            </table>
        </div>
    )
}

export default ViewObjects;