import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';


import "../../css/Calendar/Calendar.scss"


function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [listeCouleurEvent] = useState(["#0068e7","#2882ff","#c4a6ff","#ffd2ff"]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const response = await axios.get("load.php");
      setEvents(response.data);
    } catch (error) {
      console.error("Une erreur s'est produite lors du chargement des données :", error);
    }
  }

  function handleEventResaSubmit(eventDateValue, eventTimeDebutValue, eventTimeFinValue) {
    const eventStart = `${eventDateValue}T${eventTimeDebutValue}`;
    const eventEnd = `${eventDateValue}T${eventTimeFinValue}`;
    
    const eventColor = listeCouleurEvent[Math.floor(Math.random() * listeCouleurEvent.length)];
    const event_louer = "Louer par "; // Ajoutez ici le nom de l'événement

    const event_complet = {
        id: events.length,
        title: event_louer,
        start: eventStart,
        end: eventEnd,
        constraint: 'businessHours',
        color: eventColor,
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
        alert('Les réservations ne sont possibles qu\'entre 8h00 et 20h00');
        return;
    }

    setEvents(prevEvents => [...prevEvents, event_complet]);
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
    console.log(events);

}


  function handleEventClick(eventInfo) {

    // que pour les cours
    //if (eventInfo.event.groupId === 'cours') {
      if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {

        events.splice(eventInfo.event._def.publicId, 1);
        eventInfo.event.remove();

      }
    //}

  }
  
  function handleEventDrop(eventDropInfo) {
    events[eventDropInfo.event._def.publicId].start = eventDropInfo.event.start;
    events[eventDropInfo.event._def.publicId].end = eventDropInfo.event.end;  
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

      height={700} // Hauteur du calendrier ,  a supprimer plus tard

      events={events} // Evenements du calendrier

    />
      
      <form id="eventResa">
        <label >Ajouter réservation</label>
        <input type="date" id="eventDate" />
        <input type="time" id="eventTimeDebut" />
        <input type="time" id="eventTimeFin" />
        <button type="button" id="submitButtonReserv" onClick={() => handleEventResaSubmit(document.getElementById('eventDate').value, document.getElementById('eventTimeDebut').value, document.getElementById('eventTimeFin').value)}>Ajouter</button>
      </form>

      <form id="eventCours">
        <label >Ajouter cours</label>
        <input type="date" id="coursEventDate" />
        <input type="time" id="coursEventTimeDebut" />
        <input type="time" id="coursEventTimeFin" />
        <button type="button" id="submitButtonCours" onClick={() => handleEventCourSubmit(document.getElementById('coursEventDate').value, document.getElementById('coursEventTimeDebut').value, document.getElementById('coursEventTimeFin').value)}>Ajouter</button>
      </form>

    </div>
  );
}

export default CalendarComponent;