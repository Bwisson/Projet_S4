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

  useEffect(() => {
    getUser();
    if (objectType && objectInfo && objectInfo.id) {
        getResas().then(() => {
            console.log("ici les resas associées :");
            console.log(resas);
        });
    }
}, [objectInfo, objectType]);

  async function getUser() {
    try {
      const response = await axios.get("./../../php/list/fromUser/listUserInfo.php");
      setUser(response.data);
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

    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur :", error);
    }
}

  async function handleEventResaSubmit(eventDateValue, eventTimeDebutValue, eventTimeFinValue) {
    const eventStart = `${eventDateValue}T${eventTimeDebutValue}`;
    const eventEnd = `${eventDateValue}T${eventTimeFinValue}`;
    
    const eventColor = listeCouleurEvent[Math.floor(Math.random() * listeCouleurEvent.length)];
    const event_louer = "Louer par " + user.nom + " " + user.prenom; 

    const formData = new FormData();

    // Ajout des données à l'objet FormData
    formData.append('id_article', objectInfo.id);
    formData.append('title', event_louer);
    formData.append('start', eventStart);
    formData.append('end', eventEnd);
    formData.append('color', eventColor);
    formData.append('id_user', user.id);

    let endpoint;

    // Déterminer le type d'objet et l'endpoint correspondant
    if (objectType === "Ateliers") {
        endpoint = "createResaAteliers.php";
    } else if (objectType === "Modeles") {
        endpoint = "createResaModeles.php";
    } else if (objectType === "Chevalets" || objectType === "Peinture") {
        endpoint = "createResaArticles.php"; 
    } else {
        console.error("Type d'objet non pris en charge pour la réservation");
        return;
    }

    const response = await axios.post(`./../../php/createResa/${endpoint}`, formData);
    console.log("Réservation mise à jour :", response.data);


    

    const isOverlapping = events.some(event => ( // Vérifie s'il y a un chevauchement avec un autre événement
        (event.start < eventEnd && event.end > eventStart) ||
        (event.start >= eventStart && event.start < eventEnd) ||
        (event.end > eventStart && event.end <= eventEnd)
    ));

    if (isOverlapping) {
        alert('L\'événement se chevauche avec un autre événement. Veuillez choisir une autre heure.');
        return;
    }

    if (eventStart === 'T' || eventEnd === 'T') {
        alert('Veuillez remplir tous les champs');
        return;
    }

    if (eventStart >= eventEnd) {
        alert('L\'heure de début doit être inférieure à l\'heure de fin');
        return;
    }

    if (eventStart === eventEnd) {
        alert('L\'heure de début doit être différente de l\'heure de fin');
        return;
    }

    if (eventStart < eventDateValue + 'T07:59' || eventEnd > eventDateValue + 'T20:01') {
        alert('Les réservations ne sont possibles qu\'entre 8h00 et 20h00');
        return;
    }


    window.location.reload();
}


  function handleEventCourSubmit(eventDateValue, eventTimeDebutValue, eventTimeFinValue) {
    const eventStart = `${eventDateValue}T${eventTimeDebutValue}`;
    const eventEnd = `${eventDateValue}T${eventTimeFinValue}`;

    const event_complet = {
        start: eventStart,
        end: eventEnd,
        constraint: 'businessHours',
        display: 'background',
        groupId: 'cours',
    };

    const isOverlapping = events.some(event => ( // Vérifie s'il y a un chevauchement avec un autre événement
        (event.start < eventEnd && event.end > eventStart) ||
        (event.start >= eventStart && event.start < eventEnd) ||
        (event.end > eventStart && event.end <= eventEnd)
    ));

    if (isOverlapping) {
        alert('L\'événement se chevauche avec un autre événement. Veuillez choisir une autre heure.');
        return;
    }

    if (eventStart === 'T' || eventEnd === 'T') {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (eventStart >= eventEnd) {
        alert('L\'heure de début doit être inférieure à l\'heure de fin');
        return;
    }

    if (eventStart === eventEnd) {
        alert('L\'heure de début doit être différente de l\'heure de fin');
        return;
    }

    if (eventStart < eventDateValue + 'T07:59' || eventEnd > eventDateValue + 'T20:01') {
        alert('Les cours ne sont possibles qu\'entre 8h00 et 20h00');
        return;
    }


    setEvents(prevEvents => [...prevEvents, event_complet]);
    //console.log(events);

}


  function handleEventClick(eventInfo) {
    if (user) {
      const userRole = user.admin;
      if (userRole === "1") { // Si l'utilisateur est un administrateur
        if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {

          events.splice(eventInfo.event._def.publicId, 1);
          eventInfo.event.remove();
        }
      }
    }
  }

  async function handleEventDrop(eventDropInfo) {
    console.log("Déplacement d'un événement :", eventDropInfo);
    const eventId = eventDropInfo.event._def.extendedProps.id_article;
    const id_object = eventDropInfo.event._def.publicId;
    
    const eventStart = new Date(eventDropInfo.event.start);
    eventStart.setHours(eventStart.getHours() + 2);
    const eventEnd = new Date(eventDropInfo.event.end);
    eventEnd.setHours(eventEnd.getHours() + 2);
    
    // Maintenant, formatez les dates dans le format requis
    const formattedEventStart = eventStart.toISOString().slice(0, 19).replace('T', ' ');
    const formattedEventEnd = eventEnd.toISOString().slice(0, 19).replace('T', ' ');


    console.log("eventStart : ", eventStart);
    console.log("eventEnd : ", eventEnd);



    console.log("eventDropInfo.event._def.publicId : ", eventDropInfo.event._def.publicId);
    console.log("objectInfo.id : ", objectInfo.id);

    let endpoint;

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
        // Recharger la page pour refléter les modifications

        window.location.reload();
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

      height={700} // Hauteur du calendrier

      events={resas} // Evenements du calendrier

    />
      
      <form id="eventResa">
        <label >Ajouter réservation</label>
        <input type="date" id="eventDate" />
        <input type="time" id="eventTimeDebut" />
        <input type="time" id="eventTimeFin" />
        <button type="button" id="submitButtonReserv" onClick={() => handleEventResaSubmit(document.getElementById('eventDate').value, document.getElementById('eventTimeDebut').value, document.getElementById('eventTimeFin').value)}>Ajouter</button>
      </form>

      {user && user.admin === "1" && (
      <form id="eventCours">
        <label >Ajouter cours</label>
        <input type="date" id="coursEventDate" />
        <input type="time" id="coursEventTimeDebut" />
        <input type="time" id="coursEventTimeFin" />
        <button type="button" id="submitButtonCours" onClick={() => handleEventCourSubmit(document.getElementById('coursEventDate').value, document.getElementById('coursEventTimeDebut').value, document.getElementById('coursEventTimeFin').value)}>Ajouter</button>
      </form>)}

    </div>
  );
}

export default CalendarComponent;