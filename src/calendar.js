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
            start:'2023-10-29 09:00:00',
            end:'2023-10-29 12:00:00',
            title:'Evento prueba'
        },
        {
            id:2,
            allDay:false,
            start:new Date(2023, 8, 26, 15, 30, 0),
            end:new Date(2023, 8, 26, 21, 30, 0),
            title:'Evento prueba'
        },
        {   
            id:3,
            allDay:false,
            start:'2023-10-29 13:00:00',
            end:'2023-10-29 14:00:00',
            title:'Evento prueba'
            
        },
        {   
            id:4,
            allDay:false,
            start:'2023-10-29 14:00:00',
            end:'2023-10-29 18:00:00',
            title:'Evento prueba'
            
        },
        
        {   
            id:4,
            allDay:false,
            start:'2023-10-29 22:00:00',
            end:'2023-10-29 23:00:00',
            title:'Evento prueba'
            
        },
    ]
    let deckAzoteaCalendar = new Calendar({
        target: document.getElementById('deck-azotea-calendar'),
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
                    alert('Fecha seleccionada: ' + info.dateStr);
                },
                eventClick: function(info) {
                    // Función que se ejecuta cuando se hace clic en un evento
                    console.log('Evento seleccionado: ' ,info);
                },
                eventContent:function(info){
                    const end_date = new Date(info.event.end);
                    const end_time = `${end_date.getHours()}:${end_date.getMinutes().toString().padStart(2, '0')}`;
                    
                    const start_date = new Date(info.event.start);
                    const start_time = `${start_date.getHours()}:${start_date.getMinutes().toString().padStart(2, '0')}`;
                    
                    return `${start_time}-${end_time}`;
                },
                datesAboveResources:true,
                dragScroll:true,

            }        
        }
    });
    let bussinesCenterCalendar = new Calendar({
        target: document.getElementById('bussines-center-calendar'),
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
                    alert('Fecha seleccionada: ' + info.dateStr);
                },
                eventClick: function(info) {
                    // Función que se ejecuta cuando se hace clic en un evento
                    console.log('Evento seleccionado: ' ,info);
                },
                eventContent:function(info){
                    const end_date = new Date(info.event.end);
                    const end_time = `${end_date.getHours()}:${end_date.getMinutes().toString().padStart(2, '0')}`;
                    
                    const start_date = new Date(info.event.start);
                    const start_time = `${start_date.getHours()}:${start_date.getMinutes().toString().padStart(2, '0')}`;
                    
                    return `${start_time}-${end_time}`;
                },
                datesAboveResources:true,
                dragScroll:true,

            }        
        }
    });
    let socialHallCalendar = new Calendar({
        target: document.getElementById('social-hall-calendar'),
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
                    alert('Fecha seleccionada: ' + info.dateStr);
                },
                eventClick: function(info) {
                    // Función que se ejecuta cuando se hace clic en un evento
                    console.log('Evento seleccionado: ' ,info);
                },
                eventContent:function(info){
                    const end_date = new Date(info.event.end);
                    const end_time = `${end_date.getHours()}:${end_date.getMinutes().toString().padStart(2, '0')}`;
                    
                    const start_date = new Date(info.event.start);
                    const start_time = `${start_date.getHours()}:${start_date.getMinutes().toString().padStart(2, '0')}`;
                    
                    return `${start_time}-${end_time}`;
                },
                datesAboveResources:true,
                dragScroll:true,

            }        
        }
    });
   
})
