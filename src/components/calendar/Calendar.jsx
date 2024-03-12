import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
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

    function handleEventSubmit(eventDateValue, eventTimeDebutValue, eventTimeFinValue) {
        const eventDate = eventDateValue;
        const eventTimeDebut = eventTimeDebutValue;
        const eventTimeFin = eventTimeFinValue;

        const eventStart = `${eventDate}T${eventTimeDebut}`;
        const eventEnd = `${eventDate}T${eventTimeFin}`;
        const eventColor = listeCouleurEvent[Math.floor(Math.random() * listeCouleurEvent.length)];
        const event_louer = "Louer par "; // Ajoutez ici le nom de l'événement

        const event_complet = {
            title: event_louer,
            start: eventStart,
            end: eventEnd,
            constraint: 'businessHours',
            color: eventColor,
        };

        setEvents(prevEvents => [...prevEvents, event_complet]);
    }

    return (
        <div className="Calendar">
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                events={events}
                editable={true}
                allDaySlot={false}
                height={700}
                slotDuration="00:30:00"
                slotLabelInterval="01:00:00"
                businessHours={{
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    startTime: '8:00',
                    endTime: '20:00',
                    overlap: false,
                }}
                buttonText={{
                    today: 'Aujourd\'hui',
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour',
                }}
                locale="fr"
                firstDay={1}
                nowIndicator={true}
                eventOverlap={(stillEvent, movingEvent) => {
                    if (stillEvent.display === 'background' && stillEvent.groupId === 'cours') {
                        return false;
                    }
                    return true;
                }}
                eventContent={(eventContent) => {
                    if (eventContent.event.groupId === 'cours') {
                        eventContent.event.setProp('editable', false);
                    }
                    return eventContent.view.calendar.formatRange(eventContent.event.start, eventContent.event.end, {
                        hour: 'numeric',
                        minute: '2-digit',
                        separator: '-'
                    });
                }}
            />
            <form id="eventForm">
                <input type="date" id="eventDate" />
                <input type="time" id="eventTimeDebut" />
                <input type="time" id="eventTimeFin" />
                <button type="button" id="submitButtonReserv" onClick={() => handleEventSubmit(document.getElementById('eventDate').value, document.getElementById('eventTimeDebut').value, document.getElementById('eventTimeFin').value)}>Ajouter</button>
            </form>
        </div>
    );
}

export default CalendarComponent;