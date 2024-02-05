import  {
    validationCost,
    validationHour,
    compareHours,
    validateName,
    validatePhoneNumber,
    validationDates,
    ValidationIdOrLevel
} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest
} from './helpers.js'
(function($, window, document) { 

    const bookingAmenityForm = $('.booking-amenity-form');
    let errors={}
    let bookingData={}
    const paramsString=window.location.search
    const urlParams = new URLSearchParams(paramsString)
    const token = urlParams.get('token');
    const apartament_id= urlParams.get('apartament_id');
    bookingAmenityForm.each((index,amenityForm)=> {
       
        $(amenityForm).find('input').on('change',({currentTarget})=>{
            const siblingErrorSpan = $(currentTarget).siblings('span')
            try {
                errors[currentTarget.name]?delete errors[currentTarget.name]:errors={}
                if(siblingErrorSpan.length>0){
                    siblingErrorSpan.text('')
                }
                bookingDataValidations(currentTarget.name,currentTarget.value);
                bookingData={
                    ...bookingData,
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

        $(amenityForm).on('submit',async function({currentTarget}){
            event.preventDefault()
            const resultOfRequestElement = $('<span class="result-request "></span>');
            const amenity_id = $(this).find('input[name="amenity_id"]').val()
            try {
                if (Object.keys(bookingData).length===0 ||Object.keys(bookingData).length<5 ) {
                    throw new Error('No puedes enviar Vacia tu reserva')
                }
                if (Object.keys(errors).length > 0) {
                    throw new Error('Corrige los errores del formulario')
                }else{
                    ValidationIdOrLevel('id de la amenidad',amenity_id);
                    ValidationIdOrLevel('id del apartamento',apartament_id);
                    bookingData={
                        ...bookingData,
                        id_apartament_reservations:apartament_id,
                        id_amenity_reserved:amenity_id
                    }
                    const bookingAmenity = await makeRequest(BASE_URL+'user/booking/amenity/','POST', bookingData,{
                        'Authorization':token
                    });

                   if (!bookingAmenity.ok) {
                        throw new Error(bookingAmenity.error)
                   }else{
                        if($(this).find('span.result-request').length==0){
                            resultOfRequestElement.append(bookingAmenity.msg);
                            resultOfRequestElement.addClass('succes-result');
                            resultOfRequestElement.insertBefore($(this).find('.btn-submit'));
                        }else{
                            $(this).find('span.result-request').removeClass('error-input').addClass('succes-result').append(bookingAmenity.msg)
                        }
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
        $(amenityForm).find('#close-window').on('click',(event)=>{
            bookingData={}
            errors={}
            $(amenityForm).find('span.result-request').text('')
       })
    })


const bookingDataValidations=(inputName,inputValue)=>{
    const bookingValidationsObject = {
        'renter_name':(value)=>{
            validateName(value,55)
        },
        'renter_phone':(value)=>{
            validatePhoneNumber(value)
        },
        'reservation_date':(value)=>{
            validationDates(value,'fecha de reserva')
        },
        'start_reserv_time':(value)=>{
            validationHour(value,'Inicio de la reserva');

        },
        'end_reserv_time':(value)=>{
            validationHour(value,'Inicio de la reserva');

        },
    }
    if (bookingValidationsObject.hasOwnProperty(inputName)) {
        bookingValidationsObject[inputName](inputValue)

    }else{
        throw new Error(`Input inválido: ${inputName}`);
    }

}
}(window.jQuery, window, document));