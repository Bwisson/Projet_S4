/* Librairy imports */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

/* css imports */
import '../../css/cssViewsAdmin/ViewObjects.scss'
import '../../css/cssViewUser/Homepage.scss'

/* components imports */
import Button from "../Button"
import ModifInfo from './ModifInfo';
import PopUpAnnulationResa from "./PopUpAnnulationResa";


function Homepage() {
    const [currentReservations, setCurrentReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [user, setUser] = useState(null);
    const [showModifInfo, setShowModifInfo] = useState(false);
    const [dataModified, setDataModified] = useState(false);

    const [showAnnulationPopup, setShowAnnulationPopup] = useState(false);
    const [reservationIdToCancel, setReservationIdToCancel] = useState(null);
    const [reservationTypeToCancel, setReservationTypeToCancel] = useState(null);


    const toggleModifInfo = () => {
      setShowModifInfo(!showModifInfo);
    };

    const handleAnnulationClick = (reservationId, reservationType) => {
        setReservationIdToCancel(reservationId);
        setReservationTypeToCancel(reservationType);
        setShowAnnulationPopup(true);
    };

    const handlePopUpCancel = () => {
        setShowAnnulationPopup(false);
        setReservationIdToCancel(null);
        setReservationTypeToCancel(null);
    };

    const handlePopUpConfirm = () => {
        let form_data = new FormData()
        form_data.append("id_resa", reservationIdToCancel)
        if (reservationTypeToCancel === "article") {
            axios.post("./php/create/createAnnulationArticle.php", form_data)
        } else if (reservationTypeToCancel === "atelier") {
            axios.post("./php/create/createAnnulationAtelier.php", form_data)
        } else if (reservationTypeToCancel === "modele") {
            axios.post("./php/create/createAnnulationModele.php", form_data)
        }
        setShowAnnulationPopup(false);
        setReservationIdToCancel(null);
        setReservationTypeToCancel(null);
    };

    useEffect(() => {
        axios.get("./php/list/fromUser/listResaFromUser.php")
            .then(response => {
                const { articles, modeles, ateliers } = response.data;

                let currentArticlesReservations = []
                let currentAteliersReservations = []
                let currentModelesReservations = []

                let pastArticlesReservations = []
                let pastAteliersReservations = []
                let pastModelesReservations = []

                // Filtrer les réservations actuelles et passées pour chaque type d'entité
                if (articles.length > 0){
                    currentArticlesReservations = articles.filter(reservation => isCurrentReservation(reservation));
                    pastArticlesReservations = articles.filter(reservation => !isCurrentReservation(reservation));
                }

                if (ateliers.length > 0){
                    currentAteliersReservations = ateliers.filter(reservation => isCurrentReservation(reservation));
                    pastAteliersReservations = ateliers.filter(reservation => !isCurrentReservation(reservation));
                }

                if (modeles.length > 0){
                    currentModelesReservations = modeles.filter(reservation => isCurrentReservation(reservation));
                    pastModelesReservations = modeles.filter(reservation => !isCurrentReservation(reservation));
                }

                // Mettre à jour les états avec les réservations actuelles et passées
                setCurrentReservations({
                    articles: currentArticlesReservations,
                    modeles: currentModelesReservations,
                    ateliers: currentAteliersReservations
                });

                setPastReservations({
                    articles: pastArticlesReservations,
                    modeles: pastModelesReservations,
                    ateliers: pastAteliersReservations
                });

            });

      function getUser() {
        axios.get("./php/list/fromUser/listUserInfo.php")
            .then(response => {
                let datas = response.data
                setUser(datas)
                setDataModified(false)
            })
      }
      getUser()
    }, [dataModified]);

    // Fonction pour vérifier si une réservation est actuelle ou passée
    const isCurrentReservation = (reservation) => {
        const currentDate = new Date();
        const reservationEndDate = new Date(reservation.end);
        return reservationEndDate >= currentDate;
    };

    // Fonction pour afficher une liste de réservations
    function renderArticlesList(articles){
        let res= <p>Aucun article</p>
        if (articles != null) {
            if (articles.length != 0){
                for (let i = 0; i < articles.length; i++) {
                    let cat = articles[i].categorie
                    if (cat == "chevalet"){
                        articles[i].categorie = "Chevalets"
                    }else if (cat == "pinceaux_outils"){
                        articles[i].categorie = "Peinture"
                    }
                }
                let list_articles = articles.map(article =>
                    <tr>
                        <td>{article.nom}</td>
                        <td>{new Date(article.start).toLocaleDateString()}</td>
                        <td>{new Date(article.end).toLocaleDateString()}</td>
                        <td>{article.categorie}</td>
                        <td>{article.couleur}</td>
                        <td>{article.taille}</td>
                        <div className="Buttons">
                            <td><Link to={"ListObjects/" + article.categorie + "/" + article.id_article}><Button text={"Voir"} bgColor={"#2882ff"}/></Link>
                            {isCurrentReservation(article) && <Button onSmash={() => handleAnnulationClick(article.id, "article")} text="Annuler" bgColor={"#2882ff"}/>}</td>
                        </div>
                    </tr>)

                res = <table className={"tab"}>
                        <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Début</th>
                            <th scope="col">Fin</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Couleur</th>
                            <th scope="col">Taille</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_articles}
                        </tbody>
                    </table>
            }
        }
        return res
    }

    function renderAteliersList(ateliers) {
        let res = <p>Aucun ateliers</p>
        if (ateliers != null) {
            if (ateliers.length != 0){
                let list_ateliers = ateliers.map(atelier =>
                    <tr>
                        <td>{atelier.nom}</td>
                        <td>{new Date(atelier.start).toLocaleDateString()}</td>
                        <td>{new Date(atelier.end).toLocaleDateString()}</td>
                        <td>{atelier.type}</td>
                        <div className="Buttons">
                            <td><Link to={"ListObjects/Ateliers/" + atelier.id_atelier}><Button text={"Voir"} bgColor={"#2882ff"}/></Link>
                            {isCurrentReservation(atelier) && <Button onSmash={() => handleAnnulationClick(atelier.id, "atelier")} text="Annuler" bgColor={"#2882ff"}/>}</td>
                        </div>
                    </tr>)

                res =
                    <table className={"tab"}>
                        <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Début</th>
                            <th scope="col">Fin</th>
                            <th scope="col">Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_ateliers}
                        </tbody>
                    </table>
            }
        }
        return res
    }

    function renderModelesList(modeles) {
        let res = "Aucun modèles"
        if (modeles != null) {
            if (modeles.length != 0) {
                let list_modeles =
                    modeles.map(modele =>
                        <tr>
                            <td>{modele.nom}</td>
                            <td>{modele.prenom}</td>
                            <td>{new Date(modele.start).toLocaleDateString()}</td>
                            <td>{new Date(modele.end).toLocaleDateString()}</td>
                            <td>{modele.genre}</td>
                            <td>{modele.age}</td>
                            <td>{modele.tarif_horaire}</td>
                            <div className="Buttons">
                                <td><Link to={"ListObjects/Modeles/" + modele.id_modele}><Button text={"Voir"} bgColor={"#2882ff"}/></Link>
                                {isCurrentReservation(modele) && <Button onSmash={() => handleAnnulationClick(modele.id, "modele")} text="Annuler" bgColor={"#2882ff"}/>}</td>
                            </div>
                            
                        </tr>)

                res =
                    <table className={"tab"}>
                        <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Début</th>
                            <th scope="col">Fin</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Age</th>
                            <th scope="col">Tarif horaire</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_modeles}
                        </tbody>
                    </table>
            }
        }
        return res
    }

    // Fonction pour afficher une liste de réservations
    function renderReservationList(reservations){
        if (reservations != null) {
            return (
            <>
                <div className="titleTab">
                    <h3>Articles</h3>
                    {renderArticlesList(reservations.articles)}
                </div>

                <div className="titleTab">
                    <h3>Ateliers</h3>
                    {renderAteliersList(reservations.ateliers)}
                </div>

                <div className={"titleTab"}>
                    <h3>Modeles</h3>
                    {renderModelesList(reservations.modeles)}
                </div>

            </>
            )
        } else {
            return (<p>Aucune données</p>)
        }
    }

    function List() {
        /* Calcul du nombre de réservation */
        let nb_art_act;
        if (currentReservations != null && currentReservations.articles != null) {
            nb_art_act = currentReservations.articles.length;
        } else {
            nb_art_act = 0;
        }
        let nb_at_act;
        if (currentReservations != null && currentReservations.ateliers != null) {
            nb_at_act = currentReservations.ateliers.length;
        } else {
            nb_at_act = 0;
        }
        let nb_mod_act;
        if (currentReservations != null && currentReservations.modeles != null) {
        nb_mod_act = currentReservations.modeles.length;
      }else {
        nb_mod_act = 0;
      }
      let nb_art_pas;
      if (pastReservations != null && pastReservations.articles != null) {
        nb_art_pas = pastReservations.articles.length;
      }else {
        nb_art_pas = 0;
      }
      let nb_at_pas;
      if (pastReservations != null && pastReservations.ateliers != null) {
        nb_at_pas = pastReservations.ateliers.length;
      }else {
        nb_at_pas = 0;
      }
      let nb_mod_pas;
      if (pastReservations != null && pastReservations.modeles != null) {
        nb_mod_pas = pastReservations.modeles.length;
      }else {
        nb_mod_pas = 0;
      }
      let nb_resa = nb_art_act + nb_at_act + nb_mod_act + nb_art_pas + nb_at_pas + nb_mod_pas;

      /* Tableau des données utilisateur */
      if(user != null) {
          return(
            <table>
                <tbody>
                  <tr>
                    <th>Nom</th>
                    <td id={"userLastName"}>{user.nom}</td>
                  </tr>
                  <tr>
                    <th>Prenom</th>
                    <td>{user.prenom}</td>
                  </tr>
                  <tr>
                    <th>Login</th>
                    <td>{user.login}</td>
                  </tr>
                  <tr>
                    <th>Mail</th>
                    <td>{user.mail}</td>
                  </tr>
                  <tr>
                    <th>Nombre de réservations effectuées</th>
                    <td>{nb_resa}</td>
                  </tr>
                </tbody>
            </table>
          );
      }
    }

    return (
      <div className="Homepage">
        <div className="reservations">
          <div className="section">
            <h2>Réservations actuelles</h2>
            <div className="listResas">
                {renderReservationList(currentReservations)}
            </div>
          </div>
          <div className="section">
            <h2>Réservations passées</h2>
            <div className="listResas">
                {renderReservationList(pastReservations)}
            </div>
          </div>
        </div>
        <div className="section">
          <div className="informations">
          <h2>Mes informations</h2>
            {<List/> != null && <List/>}
            <Button onSmash={toggleModifInfo} text={"Modifier mes informations"} bgColor={"#2882ff"} />
            {showModifInfo && <ModifInfo setDataModified={setDataModified} />}
          </div>
        </div>
        {showAnnulationPopup && (
          <PopUpAnnulationResa
            onCancel={handlePopUpCancel}
            onConfirm={handlePopUpConfirm}
          />
        )}
      </div>
    );
}

export default Homepage;