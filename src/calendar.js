import Calendar from '../node_modules/@event-calendar/core';
import Interaction from '@event-calendar/interaction'
import TimeGrid from '@event-calendar/time-grid'
import ListDay from '@event-calendar/list'
import DayGrid from '@event-calendar/day-grid'
import ResourceGrid from '@event-calendar/resource-time-grid' 
import {
    BASE_URL,
    makeRequest
} from '../public/js/helpers.js';
(function($, window, document) {
    
    // Configura tus opciones de calendario aquí
   const bookingBtns= $('.booking-btn');

   bookingBtns.each((index,bookingBtn)=> {

    $(bookingBtn).on('click',async function({currentTarget}){
            const parentAmenityContent =$(currentTarget).parents('.amenity')
            const calendarID=parentAmenityContent.find('.calendar').attr('id')
            const amenity_id=parentAmenityContent.find('.amenity-form input[name="amenity_id"]').val()
            // const menityEvents =await makeRequest(BASE_URL+'user/events/?'+`amenity_id=${amenity_id}&date=${date}`,'GET', null,{});
           try{
            createCalendarObjectAndInsertEventsForCalendar(calendarID,amenity_id)
           } catch (error) {
                console.log(error.message);
           } 
        })
    })

   


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

  
    calendar.setOption('date', new Date('2023-12-02'));
    //{ id: 29, , start: new Date('2023-12-01 08:30:00'), end:  new Date('2023-12-01 13:00:00')},
    const date= calendar.setOption('datesSet',async function(info){
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
    console.log('asdasdasd');
   
    return calendar
  
}
const formatEventsArray =(eventsArr,calendar)=>{
    let newArr=[]
   
    eventsArr.forEach((event)=>{
      Object.entries(event).forEach(([propertyName,propertyValue])=>{
        if (propertyName === 'start' || propertyName === 'end') {
            const dateStr = `${event['date']} ${event[propertyName]}`;
            const newDate = new Date(dateStr);
            // Verifica si la fecha es válida antes de asignarla
            if (!isNaN(newDate.getTime())) {
                event[propertyName] = newDate;
            } else {
                console.error(`Fecha no válida: ${dateStr}`);
            }

        }if (propertyName==='end') {
            delete event.date
        }
        
      })
       newArr.push(event)
    })
    console.log(newArr);
    return newArr
    
}
// const addevents=async(dateToSend)=>{
//     console.log(events,calendar);
// }

}(window.jQuery, window, document));