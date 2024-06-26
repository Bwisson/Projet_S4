import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';

import "../../css/Calendar/Calendar.scss"

function CalendarComponent({ objectInfo , objectType }) {
  const [events, setEvents] = useState([]);
  const [listeCouleurEvent] = useState(["#0068e7","#2882ff","#c4a6ff","#ffd2ff"]);
  const [user, setUser] = useState(null); 
  const [resas, setResas] = useState([]);
  const [newData, setNewData] = useState(false)

  useEffect(() => {
    getUser();
    if (objectType && objectInfo && objectInfo.id) {
        getResas().then(() => {
            console.log("ici les resas associées :");
            console.log(resas);
        });
    }
}, [objectInfo, objectType, newData]);

  async function getUser() {
    try {
      const response = await axios.get("./../../php/list/fromUser/listUserInfo.php");
      setUser(response.data);
      setNewData(false)
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur :", error);
    }
  }

  async function getResas() {
    try {
        let form_data = new FormData();
        form_data.append("id", objectInfo.id);

        let response;
        if (objectType === "Ateliers" && objectInfo && objectInfo.id) {
            response = await axios.post("./../../php/list/listAtelierResas.php", form_data);
        } else if (objectType === "Modeles" && objectInfo && objectInfo.id) {
            response = await axios.post("./../../php/list/listModeleResas.php", form_data);
        } else if ((objectType === "Chevalets" || objectType === "Peinture") && objectInfo && objectInfo.id) {
            response = await axios.post("./../../php/list/listArticleResas.php", form_data);
        }
        setResas(response.data);
        console.log("Resas mis à jour :", response.data); 
        setNewData(false)
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur :", error);
    }
}

function isEventOverlapping(start1, end1, start2, end2) {
  return (new Date(start1) < new Date(end2) && new Date(end1) > new Date(start2));
}


function handleEventResaSubmit(eventDateValue, eventTimeDebutValue, eventTimeFinValue) {
  const eventStart = `${eventDateValue}T${eventTimeDebutValue}`;
  const eventEnd = `${eventDateValue}T${eventTimeFinValue}`;

  // Obtenez la date actuelle au format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Vérifiez si la date de la réservation est avant aujourd'hui
  if (eventDateValue < today) {
      alert('Vous ne pouvez pas ajouter de réservation avant la date d\'aujourd\'hui.');
      return;
  }

  const eventColor = listeCouleurEvent[Math.floor(Math.random() * listeCouleurEvent.length)];
  const event_louer = "Louer par " + user.nom + " " + user.prenom; 

  const isOverlapping = resas.some(event =>
    isEventOverlapping(eventStart, eventEnd, event.start, event.end)
  );

  if (isOverlapping) {
      alert('L\'événement se chevauche avec un autre événement. Veuillez choisir une autre heure.');
      return;
  } else if (eventStart === 'T' || eventEnd === 'T') {
      alert('Veuillez remplir tous les champs');
      return;
  } else if (eventStart >= eventEnd) {
      alert('L\'heure de début doit être inférieure à l\'heure de fin');
      return;
  } else if (eventStart === eventEnd) {
      alert('L\'heure de début doit être différente de l\'heure de fin');
      return;
  } else if (eventStart < eventDateValue + 'T07:59' || eventEnd > eventDateValue + 'T20:01') {
      alert('Les réservations ne sont possibles qu\'entre 8h00 et 20h00');
      return;
  } else {

      const formData = new FormData();
      formData.append('id_article', objectInfo.id);
      formData.append('title', event_louer);
      formData.append('start', eventStart);
      formData.append('end', eventEnd);
      formData.append('color', eventColor);
      formData.append('id_user', user.id);

      let endpoint;

      if (objectType === "Ateliers") {
          endpoint = "createResaAtelier.php";
      } else if (objectType === "Modeles") {
          endpoint = "createResaModeles.php";
      } else if (objectType === "Chevalets" || objectType === "Peinture") {
          endpoint = "createResaArticles.php"; 
      } else {
          console.error("Type d'objet non pris en charge pour la réservation");
          return;
      }

      console.log("formData : ", formData);
      const response = axios.post(`./../../php/createResa/${endpoint}`, formData);
      console.log("Réservation mise à jour :", response.data);
      setNewData(response.data);
  }
}

function handleEventCourSubmit(eventDateValue, eventTimeDebutValue, eventTimeFinValue) {
  const eventStart = `${eventDateValue}T${eventTimeDebutValue}`;
  const eventEnd = `${eventDateValue}T${eventTimeFinValue}`;

  // Obtenez la date actuelle au format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Vérifiez si la date de la réservation est avant aujourd'hui
  if (eventDateValue < today) {
      alert('Vous ne pouvez pas bloquer un créneau avant la date d\'aujourd\'hui.');
      return;
  }

  const isOverlapping = resas.some(event =>
    isEventOverlapping(eventStart, eventEnd, event.start, event.end)
  );

  if (isOverlapping) {
      alert('L\'événement se chevauche avec un autre événement. Veuillez choisir une autre heure.');
      return;
  } else if (eventStart === 'T' || eventEnd === 'T') {
      alert('Veuillez remplir tous les champs');
      return;
  } else if (eventStart >= eventEnd) {
      alert('L\'heure de début doit être inférieure à l\'heure de fin');
      return;
  } else if (eventStart === eventEnd) {
      alert('L\'heure de début doit être différente de l\'heure de fin');
      return;
  } else if (eventStart < eventDateValue + 'T07:59' || eventEnd > eventDateValue + 'T20:01') {
      alert('Les réservations ne sont possibles qu\'entre 8h00 et 20h00');
      return;
  } else {

      const formData = new FormData();
      formData.append('id_article', objectInfo.id);
      formData.append('start', eventStart);
      formData.append('end', eventEnd);
      formData.append('id_user', user.id);

      let endpoint;

      if (objectType === "Ateliers") {
          endpoint = "createCourAtelier.php";
      } else if (objectType === "Modeles") {
          endpoint = "createCourModeles.php";
      } else if (objectType === "Chevalets" || objectType === "Peinture") {
          endpoint = "createCourArticles.php"; 
      } else {
          console.error("Type d'objet non pris en charge pour la réservation");
          return;
      }

      const response = axios.post(`./../../php/createCour/${endpoint}`, formData);
      console.log("Réservation mise à jour :", response.data);
      setNewData(response.data);
  }
}



  function handleEventClick(eventInfo) {

    if (user) {
      const userRole = user.admin;
      if (userRole === "1") { // Si l'utilisateur est un administrateur
        if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
          events.splice(eventInfo.event._def.publicId, 1);
          eventInfo.event.remove();

          let endpoint;
          if (objectType === "Ateliers") {
              endpoint = "deleteResaAtelier.php";
          } else if (objectType === "Modeles") {
              endpoint = "deleteResaModeles.php";
          } else if (objectType === "Chevalets" || objectType === "Peinture") {
              endpoint = "deleteResaArticles.php"; 
          } else {
              console.error("Type d'objet non pris en charge pour la réservation");
              return;
          }

          const formData = new FormData();
          formData.append('id_resa', eventInfo.event._def.publicId);

          console.log("Id Element supprimer :", eventInfo.event._def.publicId);

          const response = axios.post(`./../../php/deleteResa/${endpoint}`, formData);
          console.log("Element supprimer :", response.data);
          setNewData(response.data)
        }
      }
    }
  }

  async function handleEventDrop(eventDropInfo) {

    const eventId = eventDropInfo.event._def.extendedProps.id_article;
    const id_object = eventDropInfo.event._def.publicId;
    
    const eventStart = new Date(eventDropInfo.event.start);
    eventStart.setHours(eventStart.getHours() + 2);
    const eventEnd = new Date(eventDropInfo.event.end);
    eventEnd.setHours(eventEnd.getHours() + 2);
    
    // Maintenant, formatez les dates dans le format requis
    const formattedEventStart = eventStart.toISOString().slice(0, 19).replace('T', ' ');
    const formattedEventEnd = eventEnd.toISOString().slice(0, 19).replace('T', ' ');

    let endpoint;

    const today = new Date().toISOString().split('T')[0];
    if (eventStart < today) {
        alert('Vous ne pouvez pas déplacer un événement avant la date d\'aujourd\'hui.');
        return;
    }

    // Déterminer le type d'objet et l'endpoint correspondant
    if (objectType === "Ateliers") {
        endpoint = "deplaceAteliers.php";
    } else if (objectType === "Modeles") {
        endpoint = "deplaceModeles.php";
    } else if (objectType === "Chevalets" || objectType === "Peinture") {
        endpoint = "deplaceArticles.php";
    } else {
        console.error("Type d'objet non pris en charge pour la réservation");
        return;
    }

    try {
        // Création d'un nouvel objet FormData
        const formData = new FormData();

        // Ajout des données à l'objet FormData
        formData.append('id', id_object);
        formData.append('start', formattedEventStart);
        formData.append('end', formattedEventEnd);
        formData.append('id_article', eventId);
        formData.append('id_user', user.id);
        
        // Envoyer la requête HTTP avec FormData
        const response = await axios.post(`./../../php/deplace/${endpoint}`, formData);
        console.log("Réservation mise à jour :", response.data);
        setNewData(response.data)

    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour de la réservation :", error);
    }
  }

  return (
    <div>
    <FullCalendar
      plugins={[ timeGridPlugin, interactionPlugin ]} // Plugins du calendrier
      eventClick={handleEventClick} // Permet de lancer une fonc quand on clique sur un événement
      eventDrop={handleEventDrop} // Permet de lancer une fonc quand on déplace un événement
      eventResize={handleEventDrop} // Permet de lancer une fonc quand on redimensionne un événement

      eventOverlap={false} // Permet de ne pas superposer les événements

      editable={true} // Permet de déplacer les événements
      nowIndicator={true} // Affiche la ligne rouge sur l'heure actuelle
      locale="fr" // Langue du calendrier sur français
      firstDay={1} // Premier jour de la semaine intialiser à lundi

      businessHours={{ // Permet de définir les heures de travail/possibilité de réservation 
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6], 
      startTime: '8:00',
      endTime: '20:00',
      overlap: false, // Permet de ne pas superposer les réservations
      }}

      buttonText={{  // Permet de changer le texte des boutons
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour', 
      }}

      allDaySlot={false} // Permet de ne pas afficher la partie pour les jours entiers

      height={"85vh"} // Hauteur du calendrier

      events={resas} // Evenements du calendrier

      className={"calendrier_comp"}
    />
      <div id="fullResa">
        <form id="eventResa">
          <label >Ajouter réservation : </label>
          <input type="date" id="eventDate" />
          <input type="time" id="eventTimeDebut" />
          <input type="time" id="eventTimeFin" />
          <button type="button" id="submitButtonReserv" onClick={() => handleEventResaSubmit(document.getElementById('eventDate').value, document.getElementById('eventTimeDebut').value, document.getElementById('eventTimeFin').value)}>Ajouter</button>
        </form>

        {user && user.admin === "1" && (
        <form id="eventCours">
          <label >Bloquer un créneau : </label>
          <input type="date" id="coursEventDate" />
          <input type="time" id="coursEventTimeDebut" />
          <input type="time" id="coursEventTimeFin" />
          <button type="button" id="submitButtonCours" onClick={() => handleEventCourSubmit(document.getElementById('coursEventDate').value, document.getElementById('coursEventTimeDebut').value, document.getElementById('coursEventTimeFin').value)}>Ajouter</button>
        </form>)}
      </div>
    </div>
  );
}

export default CalendarComponent;