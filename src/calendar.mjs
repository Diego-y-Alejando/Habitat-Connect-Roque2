import Calendar from '../../node_modules/@event-calendar/core';
import Interaccion from '../../node_modules/@event-calendar/interaction'
import TimeGrid from '../../node_modules/@event-calendar/time-grid'

document.addEventListener("DOMContentLoaded", function() {
    let ec = new Calendar({
        target: document.getElementById('ec'),
        props: {
            plugins: [TimeGrid],
            options: {
                view: 'timeGridWeek',
                events: [
                    // your list of events
                ]
            }
        }
    });
})