/* Librairy imports */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button.js"

/* css imports */
import '../../css/cssViewsAdmin/ViewObjects.scss'
import '../../css/cssViewUser/Homepage.scss'

function Homepage() {
    const [currentReservations, setCurrentReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("./php/list/fromUser/listResaFromUser.php")
            .then(response => {
                const { articles, modeles, ateliers } = response.data;

                // Filtrer les réservations actuelles et passées pour chaque type d'entité
                const currentArticlesReservations = articles.filter(reservation => isCurrentReservation(reservation));
                const currentModelesReservations = modeles.filter(reservation => isCurrentReservation(reservation));
                const currentAteliersReservations = ateliers.filter(reservation => isCurrentReservation(reservation));

                const pastArticlesReservations = articles.filter(reservation => !isCurrentReservation(reservation));
                const pastModelesReservations = modeles.filter(reservation => !isCurrentReservation(reservation));
                const pastAteliersReservations = ateliers.filter(reservation => !isCurrentReservation(reservation));

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
            })
      }
      getUser()
    }, []);

    // Fonction pour vérifier si une réservation est actuelle ou passée
    const isCurrentReservation = (reservation) => {
        const currentDate = new Date();
        const reservationEndDate = new Date(reservation.end);
        return reservationEndDate >= currentDate;
    };

    // Fonction pour afficher une liste de réservations
    function renderArticlesList(articles){
      if (articles != null) {
        return (
          <table>
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
          {articles.map(article =>
            <tbody key={article.id}>
              <tr>
                <td>{article.nom}</td>
                <td>{article.start}</td>
                <td>{article.end}</td>
                <td>{article.categorie}</td>
                <td>{article.couleur}</td>
                <td>{article.taille}</td>
                <td><Button /*link={} //L'id de l'article peut etre récupéré avec {article.id_article}*/ text={"Voir"} bgColor={"#2882ff"}/></td>
              </tr>
            </tbody>)}
          </table>
        )
        
      }else {
        return <p>Aucun article</p>
      }

      
    }

    function renderAteliersList(ateliers){
      if (ateliers != null) {
        return (
          <table>
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Début</th>
                <th scope="col">Fin</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
          {ateliers.map(atelier =>
            <tbody key={atelier.id}>
              <tr>
                <td>{atelier.nom}</td>
                <td>{atelier.start}</td>
                <td>{atelier.end}</td>
                <td>{atelier.type}</td>
                <td><Button /*link={} //L'id de l'atelier peut etre récupéré avec {atelier.id_atelier}*/text={"Voir"} bgColor={"#2882ff"}/></td>
              </tr>
            </tbody>)}
          </table>
        )
      }else {
        return <p>Aucun atelier</p>
      }
    }

    function renderModelesList(modeles) {
        console.log(modeles);
        let res = "Aucun modèles"
        if (modeles != null) {
            res = modeles.map(modele =>
                <tr>
                    <td>{modele.nom}</td>
                    <td>{modele.prenom}</td>
                    <td>{modele.start}</td>
                    <td>{modele.end}</td>
                    <td>{modele.genre}</td>
                    <td>{modele.age}</td>
                    <td>{modele.tarif_horaire}</td>
                    <td><Button /*link={} //L'id du modele peut etre récupéré avec {modele.id_modele}*/
                        text={"Voir"} bgColor={"#2882ff"}/></td>
                </tr>)
        }
        return res
    }

    // Fonction pour afficher une liste de réservations
    function renderReservationList(reservations){
        if (reservations != null) {
          return (
          <>
            <h3>Articles</h3>
            <div className="tab">
              {renderArticlesList(reservations.articles)}
            </div>

            <h3>Ateliers</h3>
            <div className="tab">
              {renderAteliersList(reservations.ateliers)}
            </div>

            <h3>Modeles</h3>
              <div className="tab">
                  <table>
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
                        {renderModelesList(reservations.modeles)}
                      </tbody>
                  </table>
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
      }else {
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
            <div className="actuelles">
                {renderReservationList(currentReservations)}
            </div>
          </div>
          <div className="section">
            <h2>Réservations passées</h2>
            <div className="passees">
                {renderReservationList(pastReservations)}
            </div>
          </div>
        </div>
        <div className="section">
          <div className="informations">
          <h2>Mes informations</h2>
            {<List/> != null && <List/>}
          </div>
        </div>
      </div>
    );
}

export default Homepage;