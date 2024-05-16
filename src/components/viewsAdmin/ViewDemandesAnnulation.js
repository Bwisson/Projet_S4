import '../../css/cssViewsAdmin/ViewDemandesAnnulation.scss'
import React, { useState, useEffect } from "react"
import axios from 'axios'
import Button from '../Button.js'
import PopUpHandleAnnulationResa from './PopUpHandleAnnulationResa.js';
function ViewDemandesAnnulation() {

    const [demandesAnnulation, setDemandesAnnulation] = useState(null);
    const [showAnnulationPopup, setShowAnnulationPopup] = useState(false);
    const [handleType, setHandleType] = useState(null);
    const [annulationId, setAnnulationId] = useState(null);
    const [reservationIdToCancel, setReservationIdToCancel] = useState(null);
    const [reservationTypeToCancel, setReservationTypeToCancel] = useState(null);

    const [newData, setNewData] = useState(false);
    const handleAnnulationClick = (handleType, annulationId, reservationId, reservationType) => {
    setHandleType(handleType);
    setAnnulationId(annulationId);
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
    form_data.append("id", annulationId);
    if (handleType === "confirmer") {
        form_data.append("id_resa", reservationIdToCancel);
    }
    let req = "./php/delete/demandesAnnulation/" + reservationTypeToCancel + "/" + handleType + ".php";
    axios.post(req, form_data)
        .then(response => {
        setNewData(response.data)
    })
    setShowAnnulationPopup(false);
    setReservationIdToCancel(null);
    setReservationTypeToCancel(null);
    }

    useEffect(() => {
        axios.get("./php/list/listDemandesAnnulation.php")
          .then(response => {
            const data = response.data;

            const initialDemandes = {
              articles: data.articles ? data.articles : null,
              ateliers: data.ateliers ? data.ateliers : null,
              modeles: data.modeles ? data.modeles : null
            };
            setDemandesAnnulation(initialDemandes);
          })
          .catch(error => {
            console.error("Error fetching demandes d'annulation: ", error);
            setDemandesAnnulation({
              articles: null,
              ateliers: null,
              modeles: null
            });
          })
        setNewData(false)
    }, [newData]);

    function renderArticlesList(articles){
      if (articles != null) {
          if (articles.length > 0){
              return (
                  <table>
                      <thead>
                      <tr>
                          <th scope="col">Nom de l'article</th>
                          <th scope="col">Début</th>
                          <th scope="col">Fin</th>
                          <th scope="col">Utilisateur</th>
                      </tr>
                      </thead>
                      {articles.map(article =>
                          <tbody key={article.id}>
                          <tr>
                              <td>{article.nom_article}</td>
                              <td>{article.start}</td>
                              <td>{article.end}</td>
                              <td>{article.prenom_user + ' ' + article.nom_user}</td>
                              <div className="Buttons">
                                  <td><Button onSmash={() => handleAnnulationClick("confirmer", article.id, article.id_resa, "article")} text={"Confirmer"} bgColor={"#2882ff"}/>
                                      <Button onSmash={() => handleAnnulationClick("rejeter", article.id, article.id_resa, "article")} text={"Rejeter"} bgColor={"#2882ff"}/></td>
                              </div>
                          </tr>
                          </tbody>)}
                  </table>
              )
          }

      }else {
        return <p>Aucun articles</p>
      }
    }

    function renderAteliersList(ateliers){
      if (ateliers != null) {
          if (ateliers.length > 0){
              return (
                  <table>
                      <thead>
                      <tr>
                          <th scope="col">Nom de l'atelier</th>
                          <th scope="col">Début</th>
                          <th scope="col">Fin</th>
                          <th scope="col">Utilisateur</th>
                      </tr>
                      </thead>
                      {ateliers.map(atelier =>
                          <tbody key={atelier.id}>
                          <tr>
                              <td>{atelier.nom_atelier}</td>
                              <td>{atelier.start}</td>
                              <td>{atelier.end}</td>
                              <td>{atelier.prenom_user + ' ' + atelier.nom_user}</td>
                              <div className="Buttons">
                                  <td><Button onSmash={() => handleAnnulationClick("confirmer", atelier.id, atelier.id_resa, "atelier")} text={"Confirmer"} bgColor={"#2882ff"}/>
                                      <Button onSmash={() => handleAnnulationClick("rejeter", atelier.id, atelier.id_resa, "atelier")} text={"Rejeter"} bgColor={"#2882ff"}/></td>
                              </div>
                          </tr>
                          </tbody>)}
                  </table>
              )
          }

      }else {
        return <p>Aucun ateliers</p>
      }
    }

    function renderModelesList(modeles){
      if (modeles != null) {
          if (modeles.length > 0){
              return (
                  <table>
                      <thead>
                      <tr>
                          <th scope="col">Nom du modèle</th>
                          <th scope="col">Début</th>
                          <th scope="col">Fin</th>
                          <th scope="col">Utilisateur</th>
                      </tr>
                      </thead>
                      {modeles.map(modele =>
                          <tbody key={modele.id}>
                          <tr>
                              <td>{modele.prenom_modele + ' ' + modele.nom_modele}</td>
                              <td>{modele.start}</td>
                              <td>{modele.end}</td>
                              <td>{modele.prenom_user + ' ' + modele.nom_user}</td>
                              <div className="Buttons">
                                  <td><Button onSmash={() => handleAnnulationClick("confirmer", modele.id, modele.id_resa, "modele")} text={"Confirmer"} bgColor={"#2882ff"}/>
                                      <Button onSmash={() => handleAnnulationClick("rejeter", modele.id, modele.id_resa, "modele")} text={"Rejeter"} bgColor={"#2882ff"}/></td>
                              </div>
                          </tr>
                          </tbody>)}
                  </table>
              )
          }
      }else {
        return <p>Aucun modèle</p>
      }
    }

    return (
      <div className="ViewDemandesAnnulation">
        <div className="tab">
          <h3>Articles</h3>
          {demandesAnnulation != null && renderArticlesList(demandesAnnulation.articles)}
        </div>

        <div className="tab">
          <h3>Ateliers</h3>
          {demandesAnnulation != null && renderAteliersList(demandesAnnulation.ateliers)}
        </div>

        <div className="tab">
          <h3>Modeles</h3>
          {demandesAnnulation != null && renderModelesList(demandesAnnulation.modeles)}
        </div>
        {showAnnulationPopup && (
          <PopUpHandleAnnulationResa
            handleType={handleType}
            onCancel={handlePopUpCancel}
            onConfirm={handlePopUpConfirm}
          />
        )}
      </div>
    );
}

export default ViewDemandesAnnulation;
