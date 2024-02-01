import {
    validationDates
} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest,
    defaultMaintenanceMonth
} from './helpers.js'

$(document).ready(function() {
    let year = new Date().getFullYear();
    //0: no info
    //1: impago
    //2: pago moroso
    //3: pago al dia
    const titleNavMaintenanceCalendar =$(".calendar-nav-title").text(year);
    const currentUrl = window.location.href;
    const apartamentoIdMatch = currentUrl.match(/\/apartamento\/(\d+)/);
    const id = apartamentoIdMatch[1];
    const containerMonths = $('.container-months')
    const calendarHeader =$('.calendar-nav')

    const circleClasses = {
        0: 'circle-grey',
        1: 'circle-red',
        2: 'circle-yellow',
        3: 'circle-green'
    };
    async function loadingMaintenanceData(year) {
        try {
            const maintenanceData  =  await makeRequest(`${BASE_URL}admin/maintenance/apartament/?apartament_id=${id}&current_year=${year}`,'GET', null,{})
            if (!maintenanceData.ok) {
                throw new Error(maintenanceData.error)
            }
            let monthArr=[]
            const maintenanceRecord = maintenanceData.maintenanceData 
           
            if (maintenanceData.maintenanceData.length==0) {
                containerMonths.empty().append(defaultMaintenanceMonth)
            }else{
                Object.keys(maintenanceRecord).forEach(month => {
                      
                  const circleValue = circleClasses[maintenanceRecord[month].paid_status] 
                  const template= `
                    <div class="calendar-month" id="${year}-${month}" >
                       <span class="title">${month}</span>
                        <div class="circle ${circleValue}"></div>
                        <input type="hidden" value="${maintenanceRecord[month].date_paid || ''}">
                    </div>`;
                    monthArr.push(template)
                });
                containerMonths.empty().append(monthArr)
            }
            
        } catch (error) {
            containerMonths.empty().append(`<span class="get-maintenance-result">${error.message}</span>`)
        }
    }
    loadingMaintenanceData(year)
    $("#calendar-go-next").click(function() {
        year++;
        titleNavMaintenanceCalendar.text(year);
        loadingMaintenanceData(year)
    });
    $("#calendar-go-back").click(function() {
        year--;
        titleNavMaintenanceCalendar.text(year);
        loadingMaintenanceData(year)
    });
    // ventana modal
    const maintenanceModalWindow =$('.modal-maintenance')
    const formUpdateMaintenance = $('#update-maintenance-form')
    const titleForm =$('#month-maintenance')
    const inputDatePay =$('#maintenance-date')
    let maintenanceUpdateData={} ,errors={}
    $('.container-months').on('click','.calendar-month', function(event){
    
        maintenanceModalWindow.css({
            display: 'flex',
        }).animate({
            opacity:1
        }, 400, function() {
            console.log('Animación completada');
        });

        const monthTopay = $(this).find('.title').text()
        const current_year =$(this).parent().parent().find('.calendar-nav-title').text()
        const currentDateValue = $(this).find('input').val()
        titleForm.text(`${monthTopay} de ${current_year}`)
        inputDatePay.val(currentDateValue)
      
    })
   


    inputDatePay.on('change',function({currentTarget}){
        const siblingErrorSpan = $(currentTarget).siblings('span')
        try {
            errors[currentTarget.name]?delete errros[currentTarget.name]:errors={}
            if(siblingErrorSpan.length>0){
                siblingErrorSpan.text('')
            }
            validationDates($(this).val())
            maintenanceUpdateData={
                ...maintenanceUpdateData,
                [currentTarget.name]:currentTarget.value
            }
        } catch (error) {
            errors={
                ...errors,
                [currentTarget.name]:error.message
            } 
            if(siblingErrorSpan.length==0){
                $(`<span class="error-input col-span-2">${errors[currentTarget.name]}</span>`).insertAfter($(currentTarget));
            }else{
                siblingErrorSpan.text(error.message)
            }   
        }
    })
    formUpdateMaintenance.on('submit',async function (event){
        event.preventDefault()
        const resultOfRequestElement = $('<span class="result-request "></span>');
        
    
        try {
            if (Object.keys(maintenanceUpdateData).length===0) {
                throw new Error('Debes ingresar o editar la fecha ')
            }
            if (Object.keys(errors).length > 0) {
                throw new Error('Corrige los errores del formulario')
            }
            const titleString = $(this).find('.title-form').text()
            const parts = titleString.split(' ');
            const englishMonth =monthSpanishToEnglish(parts[0])
            const year = parts[2];
            maintenanceUpdateData={
                ...maintenanceUpdateData,
                year:year,
                month:englishMonth
            }
            const updateMaintenance = await makeRequest(BASE_URL+'admin/update/apartament/maintenance/'+id,'POST', maintenanceUpdateData,{})

            if (!updateMaintenance.ok)throw new Error(updateMaintenance.error)
            if($(this).find('span.result-request').length==0){
                resultOfRequestElement.text(updateMaintenance.msg);
                resultOfRequestElement.addClass('succes-result');
                resultOfRequestElement.insertBefore($(this).find('.btn-submit'));

            }else{
                $(this).find('span.result-request').removeClass('error-input').addClass('succes-result').text(updateMaintenance.msg)
            }
            
            containerMonths.find(`#${year}-${parts[0]}`).find('div.circle').removeClass().addClass(`circle ${circleClasses[updateMaintenance.paid_status] }`)
            
            
        }catch (error) {
            if($(this).find('span.result-request').length==0){
                resultOfRequestElement.text(error.message);
                resultOfRequestElement.addClass('error-input');
                resultOfRequestElement.insertBefore($(this).find('.btn-submit'));
            }else{
                $(this).find('span.result-request').removeClass('succes-result').addClass('error-input').text(error.message)
            }    
        }
      
    }) 

    $('#close-window').on('click',function(event){
        const closeContainer =$(this).closest('.modal-maintenance');
        closeContainer.animate({
            opacity:0
        }, 400).css({
            display: 'none',
        });
        errors={}
        maintenanceUpdateData={}
        formUpdateMaintenance.find('span.result-request').text('')
        
    })
    function monthSpanishToEnglish(spanishMonth) {
        const month = {
          'ene': 'january',
          'feb': 'february',
          'mar': 'march',
          'abr': 'april',
          'may': 'may',
          'jun': 'june',
          'jul': 'july',
          'ago': 'august',
          'sep': 'september',
          'oct': 'october',
          'nov': 'november',
          'dec': 'december',
        };
      
        const englishMonth = month[spanishMonth.toLowerCase()];  // Convertir a minúsculas para ser insensible a mayúsculas
      
        if (englishMonth) {
          return englishMonth;
        } else {
          throw  new Error('Mes no válido')
          return null;
        }
      }
});



