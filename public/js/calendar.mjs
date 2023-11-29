import Calendar from './@event-calendar/core';
import Interaccion from './@event-calendar/interaction'
import TimeGrid from './@event-calendar/time-grid'

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