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
import  {
    validationCost,
    validationHour,
    compareHours,
    validateName,
    validatePersonalPhone,
    validationDates,
    ValidationIdOrLevel
} from '../public/js/validators.js'
(function($, window, document) {

    const divCalendarId = $('.calendar').attr('id')
    const calendar = new Calendar({
        target: document.getElementById(divCalendarId),
        props: {
            plugins: [ListDay,DayGrid,ResourceGrid,TimeGrid,Interaction],
            options: {
                view: 'dayGridMonth',
                events:[],
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
    const amenity_id = $('.amenity-form').find('input[type="hidden"]').val()
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
            // mostrar el error del calendario
            console.log(error);
        }
    })
    const updateBookingForm = $('#update-booking-form')
    const updateBookingInputs= $('.update-booking-input')
    
    const paramsString=window.location.search
    const urlParams = new URLSearchParams(paramsString)
    const reserv_id = urlParams.get('reserv_id');
    const apartament_id= urlParams.get('apartament_id');
    let errors={}
    let updateBookingData={}
    updateBookingInputs.each((index ,input)=>{
        
        $(input).on('change',function({currentTarget}){
            const siblingErrorSpan = $(currentTarget).siblings('span')
            try {
                errors[currentTarget.name]?delete errors[currentTarget.name]:errors={}
                if(siblingErrorSpan.length>0){
                    siblingErrorSpan.text('')
                }
                updateBookingDataValidations(currentTarget.name,currentTarget.value);
                updateBookingData={
                    ...updateBookingData,
                    [currentTarget.name]:currentTarget.value
                }
            } catch (error) {
                errors={
                    ...errors,
                    [currentTarget.name]:error.message
                } 
                if(siblingErrorSpan.length==0){
                    $(`<span class="error-input">${errors[currentTarget.name]}</span>`).insertAfter($(currentTarget));
                }else{
                    siblingErrorSpan.text(error.message)
                }
            }
        })
    })
    updateBookingForm.on('submit', async function(event){
        event.preventDefault()
        const resultOfRequestElement = $('<span class="result-request "></span>');
        try {
            if (Object.keys(updateBookingData).length===0 ) {
                throw new Error('Actualiza almenos un campo de tu reserva')
            }
            if (Object.keys(errors).length > 0) {
                throw new Error('Corrige los errores del formulario')
            }
            const jqueryCurrentTarget=$(event.currentTarget)
            const requiredFields=['reservation_date','start_reserv_time','end_reserv_time']
            const hasAnyProperty = requiredFields.some((field) => updateBookingData[field]);
            // Si al menos una propiedad está presente, agrega el resto de valores
            if (hasAnyProperty) {
                requiredFields.forEach((field) => {
                    if (!updateBookingData[field]) {
                        updateBookingData[field] = jqueryCurrentTarget.find(`input[name="${field}"]`).val();
                    }
                });
            }     
            updateBookingData={
                ...updateBookingData,
                reserv_id:reserv_id,
                id_apartament_reservations:apartament_id,   
            }
            const updatedBooking = await makeRequest(BASE_URL+'user/update/my/reservation/','POST', updateBookingData,{});
            if (!updatedBooking.ok){
                throw new Error(updatedBooking.error)
            }else{
                const arrEvents =formatEventsArray([updatedBooking.newBooking])
                calendar.updateEvent(arrEvents[0])
                if($(this).find('span.result-request').length==0){
                    resultOfRequestElement.text(updatedBooking.msg);
                    resultOfRequestElement.addClass('succes-result');
                    resultOfRequestElement.insertBefore($(this).find('.btn-submit'));
                }else{
                    $(this).find('span.result-request').removeClass('error-input').addClass('succes-result').text(updatedBooking.msg)
                }
            }
        } catch (error) {
            if($(this).find('span.result-request').length==0){
                resultOfRequestElement.text(error.message);
                resultOfRequestElement.addClass('error-input');
                resultOfRequestElement.insertBefore($(this).find('.btn-submit'));
            }else{
                $(this).find('span.result-request').removeClass('succes-result').addClass('error-input').text(error.message)
            }
        }
    })


    const updateBookingDataValidations =(inputName,inputValue)=>{
        const updateValidationsObject ={
            'renter_name':(value)=>{
                validateName(value,55)
            },
            'renter_phone':(value)=>{
                validatePersonalPhone(value)
            },
            'reservation_date':(value)=>{
                validationDates(value,'fecha de reserva')
            },
            'start_reserv_time':(value)=>{
                validationHour(value,'Inicio de la reserva');

            },
            'end_reserv_time':(value)=>{
                validationHour(value,'Inicio de la reserva');
            }
        }
        if (updateValidationsObject.hasOwnProperty(inputName)) {
            updateValidationsObject[inputName](inputValue)
    
        }else{
            throw new Error(`Input inválido: ${inputName}`);
        }
    }
}(window.jQuery, window, document));