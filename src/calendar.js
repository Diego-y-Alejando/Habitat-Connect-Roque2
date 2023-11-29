import Calendar from '../node_modules/@event-calendar/core';
import Interaction from '../node_modules/@event-calendar/interaction'
import TimeGrid from '../node_modules/@event-calendar/time-grid'
import listDay from '../node_modules/@event-calendar/list'
import dayGrid from '../node_modules/@event-calendar/day-grid'
import resourceGrid from '../node_modules/@event-calendar/resource-time-grid'
document.addEventListener("DOMContentLoaded", function() {
    // Configura tus opciones de calendario aquí
    let arrEvents=[
        {
            id:1,
            allDay:false,
            start_time:new Date(2023, 10, 1, 08, 30, 0),
            end_time:new Date(2023, 10, 1, 11, 30, 0),
            title:'Evento prueba'
        }
    ]
    let ec = new Calendar({
        target: document.getElementById('ec'),
        props: {
            plugins: [listDay,dayGrid,resourceGrid,TimeGrid,Interaction],
            options: {
                view: 'dayGridMonth',
                events:arrEvents,
                headerToolbar: {
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                dateClick: function(info) {
                    // Función que se ejecuta cuando se hace clic en una fecha
                    console.log('Fecha seleccionada: ' + info.dateStr);
                },
                eventClick: function(info) {
                    // Función que se ejecuta cuando se hace clic en un evento
                    alert('Evento seleccionado: ' + info.event.title);
                },
                datesAboveResources:true,
                dragScroll:true
            }        
        }
    });
   
})
