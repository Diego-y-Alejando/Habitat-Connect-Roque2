import Calendar from '../node_modules/@event-calendar/core';
import Interaction from '@event-calendar/interaction'
import TimeGrid from '@event-calendar/time-grid'
import ListDay from '@event-calendar/list'
import DayGrid from '@event-calendar/day-grid'
import ResourceGrid from '@event-calendar/resource-time-grid' 
import {
    BASE_URL,
    makeRequest,
    formatEventsArray
} from '../public/js/helpers.js';
(function($, window, document) {
    const bookingBtns = $('.booking-btn');
    let countClicks = 0;
    const calendarsCreated = new Set(); // Utilizamos un Set para registrar IDs de calendario creados

    bookingBtns.each((index, bookingBtn) => {
        $(bookingBtn).on('click', async function ({ currentTarget }) {
            countClicks = countClicks + 1;
            const parentAmenityContent = $(currentTarget).parents('.amenity');
            const calendarID = parentAmenityContent.find('.calendar').attr('id');
            const amenity_id = parentAmenityContent.find('.amenity-form input[name="amenity_id"]').val();
            
            try {
                // Verificar si el calendario ya fue creado para este ID
                if (!calendarsCreated.has(calendarID)) {
                    await createCalendarObjectAndInsertEventsForCalendar(calendarID, amenity_id);
                    calendarsCreated.add(calendarID); // Agregar el ID al Set
                }
            } catch (error) {
                console.log(error.message);
            }
        });
    });


const createCalendarObjectAndInsertEventsForCalendar =async(idToAttachCalendar,amenity_id)=>{
    const calendar = new Calendar({
        target: document.getElementById(idToAttachCalendar),
        props: {
            plugins: [ListDay,DayGrid,ResourceGrid,TimeGrid,Interaction],
            options: {
                view: 'dayGridMonth',
                events:[
                  
                ],
                headerToolbar: {
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                viewDidMount:function(info){
                },
                eventContent:function(info){
                    const end_date = new Date(info.event.end);
                    const end_time = `${end_date.getHours()}:${end_date.getMinutes().toString().padStart(2, '0')}`;
                    const start_date = new Date(info.event.start);
                    const start_time = `${start_date.getHours()}:${start_date.getMinutes().toString().padStart(2, '0')}`;
                    return `${start_time}-${end_time}`;
                },
                datesSet:{},
                loading:function (info){
                    console.log(info);
                },
                datesAboveResources:true,
                dragScroll:true,
            }        
        }
    });
    calendar.setOption('date',new Date())
    calendar.setOption('datesSet',async function(info){
        const {currentEnd, currentStart ,title} =info.view
        const year =currentStart.getFullYear()
        const month=(currentStart.getMonth()+1).toString().padStart(2, '0');
        const day = (currentStart.getDate()+1).toString().padStart(2, '0');
        const dateToSend = `${year}-${month}-${day}`
        try {
            const events= await makeRequest(BASE_URL+'user/events/?'+`amenity_id=${amenity_id}&date=${dateToSend}`,'GET',null,{});
            const arrEvents =formatEventsArray(events.events,calendar)
            calendar.setOption('events',arrEvents)
        }catch (error) {
            throw new Error(error)
        }
        
    })
    return calendar
}

}(window.jQuery, window, document));