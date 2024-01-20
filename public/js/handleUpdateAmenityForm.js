import  {
    validationCost,
    validationHour,
    compareHours

} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest
} from './helpers.js'
(function($, window, document) { 

const updateamenityForms = $('.edit-amenity-form');
const updateAmenityInputs = $('.update-amenity-input');

    let dataAmenityToUpdate={}
    let errors={}
    // recorre todos los formularios
    updateamenityForms.each((index,amenityForm)=> {
       // eventos input del form para capturar el valor
       $(amenityForm).find('input').on('change',({currentTarget})=>{
        const siblingErrorSpan = $(currentTarget).siblings('span')
           try{
                // verifica si el input que perdio el foco ya tiene un error  de ser asi lo borra para poder detectar el nuevo cambio 
                errors[currentTarget.name]?delete errors[currentTarget.name]: errors ={} 
                // verifica que no exista el span error 
                if(siblingErrorSpan.length>0){
                    siblingErrorSpan.text('')
                }
                updateAmenityDataValidations(currentTarget.name,currentTarget.value);
                dataAmenityToUpdate={
                    ...dataAmenityToUpdate,
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
    //    evento submit del formulario
       $(amenityForm).on('submit',async function({currentTarget}){
            const resultOfRequestElement = $('<span class="result-request "></span>');
            const amenity_id = $(this).find('input[name="amenity_id"]').val()
            try {
                event.preventDefault();
                if (Object.keys(dataAmenityToUpdate).length===0) {
                    throw new Error('No puedes enviar Vacia tu reserva')
                }
                if (Object.keys(errors).length > 0) {
                  throw new Error('Corrige los errores del formulario')
                }else{
                    const updateAmenity = await makeRequest(BASE_URL+'admin/update/amenity/data/'+amenity_id,'POST', dataAmenityToUpdate,{});
                    if (!updateAmenity.ok){
                        throw new Error(updateAmenity.error)
                    }else{
                        const DataDoomAmenity = $(this).closest('section.amenity').find('p.data-schedule-cost');
                        updateAmenityContent(updateAmenity.updatedData, DataDoomAmenity)
                        if($(this).find('span.result-request').length==0){
                            resultOfRequestElement.text(updateAmenity.msg);
                            resultOfRequestElement.addClass('succes-result');
                            resultOfRequestElement.insertBefore($(this).find('.btn-submit'));

                        }else{
                            $(this).find('span.result-request').removeClass('error-input').addClass('succes-result').text(updateAmenity.msg)
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
        //limpia el objeto que servirá para enviar los datos al server   
       $(amenityForm).find('#close-window').on('click',(event)=>{
            dataAmenityToUpdate={}
            errors={}
            $(amenityForm).find('span.result-request').text('')
       })
      
    })
const updateAmenityDataValidations =(inputName,inputValue)=>{
    const updateValidations={
        'rent_cost':(value,inputName)=>{
            validationCost(value,'renta');
        },
        'start_time':(value,inputName)=>{
            validationHour(value,'inicio de horario de la amenidad');
        },
        'end_time':(value,inputName)=>{
            validationHour(value,'cierre de horario de la amenidad');
           
        },
        'additional_cost_per_hour':(value,inputName)=>{
            validationCost(value,'adicional por hora');
        }
    }
    if (updateValidations.hasOwnProperty(inputName)) {
        updateValidations[inputName](inputValue,inputName)

    }else{
        throw new Error(`Input inválido: ${inputName}`);
    }
}
// actualiza el contenido dde lo que se actualizó
    const updateAmenityContent =(updatedDataAmenity,objetToChangeText)=>{
        let newText=''
        const text = objetToChangeText.text()
        const regexReplaceData ={
            'rent_cost':{
                regex:/hora Q[\d]{2,3}\.[\d]{2}$/m,
                concatText:'hora Q'
            },
            'start_time':{
                regex:/\bHorario\b ([0-9]|1[0-9]|2[0-4]):([0-5][0-9])/mi,
                concatText:'Horario'
            },
            'end_time':{
                regex:/a (0[0-9]|1[0-9]|2[0-4]):([0-5][0-9])/m,
                concatText:'a '
            },
            'additional_cost_per_hour':{
                regex:/ extra a Q[\d]{2,3}\.[\d]{2}$/m,
                concatText:'extra a Q'
            }
        }
        Object.entries(regexReplaceData).forEach(([propertyName, propertyValue]) => {
            if (updatedDataAmenity.hasOwnProperty(propertyName)) {    
                newText = text.replace(propertyValue.regex,`${propertyValue.concatText + updatedDataAmenity[propertyName]}`)
                
            }
        })
        console.log(newText);
        objetToChangeText.text(newText)
    
    }
}(window.jQuery, window, document));