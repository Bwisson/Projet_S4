/* Librairy imports */
import React, { useState, useEffect } from "react";
import axios from "axios";

/* css imports */
import '../../css/cssViewsAdmin/ViewObjects.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'

function ViewObjects() {
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
    }, []);

    // Fonction pour vérifier si une réservation est actuelle ou passée
    const isCurrentReservation = (reservation) => {
        const currentDate = new Date();
        const reservationEndDate = new Date(reservation.fin);
        return reservationEndDate >= currentDate;
    };

    // Fonction pour afficher une liste de réservations
    const renderReservationList = (reservations) => {
        return (
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        {reservation.nom} - {reservation.debut} à {reservation.fin}
                    </li>
                ))}
            </ul>
        );
    };

    useEffect(() => {
      function getUser() {
          axios.get("./php/list/fromUser/listUserInfo.php")
              .then(response => {
                  let datas = response.data
                  setUser(datas)
              })
      }
      getUser() 
  }, []);

    function List(){
      let list_user = null
      if(user != null) {
          return(
          <tr>
            <td id={"userLastName"}>{user.nom}</td>
            <td>{user.prenom}</td>
            <td>{user.login}</td>
            <td>{user.mail}</td>
          </tr>
          );
      }
    }

    return (
      <div className="container">
          <div className="section">
            <h2 className="section-title">Réservations actuelles</h2>
              <h3>Articles</h3>
              {renderReservationList(currentReservations.articles)}
              <h3>Modèles</h3>
              {renderReservationList(currentReservations.modeles)}
              <h3>Ateliers</h3>
              {renderReservationList(currentReservations.ateliers)}
          </div>

          <div className="section">
            <h2>Réservations passées</h2>
              <h3>Articles</h3>
              {renderReservationList(pastReservations.articles)}
              <h3>Modèles</h3>
              {renderReservationList(pastReservations.modeles)}
              <h3>Ateliers</h3>
              {renderReservationList(pastReservations.ateliers)}
          </div>

          <div className="section">
            <h2>Mes informations</h2>
            <table>
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Login</th>
                  <th scope="col">Mail</th>
                </tr>
              </thead>
              <tbody>
                {<List/> != null ? <List/> : null}
              </tbody>
            </table>
          </div>
        </div>
    );
}

export default ViewObjects;