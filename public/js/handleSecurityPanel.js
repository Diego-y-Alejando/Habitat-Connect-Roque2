import {
    BASE_URL,
    headers,
    makeRequest,
    apartamentItemGenerator
} from './helpers.js'
(function($, window, document) {

    const buttonCreateElement=$('#create-home-visit');
    const modalWindow = $('#modal-window')
    const buttonCreateDelivery =$('#create-package-delivery')

    buttonCreateElement.on('click',function(event){
        handleModalWindow('create-home-visit',modalWindow,null)
    });
    buttonCreateDelivery.on('click',function(event){
        handleModalWindow('create-package-delivery',modalWindow,null)
    });
    const handleModalWindow =(typeContent,container,dataForCheck)=>{
        const contentsModalWindow ={
            // formulario de crear visita domestica 
            'create-home-visit':`
                <form class="form-modal-window" id="form-create-home-visit">
                    <h3 class="title-form">Creando visita doméstica</h3>
                    <label class="label-modal-form" for="apartament_id">
                        <select class="select-form home-visit-input" name="apartament_id" >
                            <option class="option-select" disabled selected>Apartamento que visita</option>
                            <option class="option-select" value="1">1-1</option>
                            <option class="option-select" value="2">1-2</option>
                        </select>
                    </label>
                    <label class="label-modal-form " for="resident_name">
                        <input type="text" class="input-form home-visit-input" placeholder="Nombre del residente" name="resident_name">
                    </label>
                    <label class="label-modal-form " for="visitors_name">
                        <input type="text" class="input-form home-visit-input" placeholder="Nombre del visitante" name="visitors_name">
                    </label>
                    <label class="label-modal-form " for="dpi">
                        <input type="text" class="input-form home-visit-input" placeholder="Identificacion del visitante" name="dpi">
                    </label>
                    <div class="container-buttons">
                        <input type="submit" class="btn-form btn-submit " value="Registrar" id="submit-home-visit">
                        <input type="button" class="btn-form btn-cancel " value="Cancelar" id="close-modal-window">
                    </div>
                </form>`,
            //formulario de crear delivery 
            'create-package-delivery': `
                <form class="form-modal-window" id="form-create-package-delivery">
                    <h3 class="title-form">Creando entrega de paquete</h3>
                    <label class="label-modal-form" for="apartament_id">
                        <select class="select-form package-delivery-input" name="apartament_id" >
                            <option class="option-select" disabled selected>Apartamento que visita</option>
                            <option class="option-select" value="1">1-1</option>
                            <option class="option-select" value="2">1-2</option>
                        </select>
                    </label>
                    <label class="label-modal-form ">
                        <input type="text" class="input-form package-delivery-input" placeholder="Nombre del residente" name="resident_name">
                    </label>
                    <label class="label-modal-form ">
                        <input type="text" class="input-form package-delivery-input" placeholder="Nombre de la empresa" name="company_name">
                    </label>
                    <div class="container-buttons">
                        <input type="submit" class="btn-form btn-submit " value="Guardar"  id="submit-package-delivery">
                        <input type="button" class="btn-form btn-cancel " value="Cancelar" id="close-modal-window">
                    </div>
                </form>`,
            'check-foreinger':(object)=>{
                return `
                <div class="container-check-item">
                    <img class="check-icon" src="/public/icons/marca-de-verificacion png.png">
                    <h3 class="check-title">${object.message}</h3>
                    <span class="apartament-number">Apartamento # ${object.apartament}</span>
                    <span class="foreinger-name">${object.name}</span>  
                    <span class="field-name">Fecha :</span>
                    <spa class="field-value">${object.date}</spa>
                    <span class="field-name">Hora :</span>
                    <spa class="field-value">${object.hour}</spa>
                    <input type="hidden" data-id="${object.id}" data-state="${object.state}" name="id" >
                    <input type="hidden" data-prev-state="${object.prevState}" name="prevState">
                    <input type="hidden" data-url-to-send=${object.visitType} name="visitType">
                    <button class="btn-undo" id="close-modal-window"><strong>Deshacer</strong> acción</button>
                </div>`
            }, 
            'error':(error)=>{
                return `
                <div class="container-check-item">
                    <img class="check-icon" src="/public/icons/cancelar.png">
                    <h3 class="error-title">${error}</h3>
                </div>`
            }
        }
        const contentToAppend = dataForCheck?
                                contentsModalWindow[typeContent](dataForCheck)
                                :contentsModalWindow[typeContent]
        container.empty().append(contentToAppend)
        container.css({
            display: 'grid',
        }).animate({
                opacity:1
            }, 400);
      
        // cierra la ventana automatica para el marcaje
        let handleTimeout;
        // if (dataForCheck) {
        //     console.log('true');
        //     handleTimeout = setTimeout(() => {
        //         container.css({
        //             display: 'none',
        //         }).animate({
        //                 opacity:0
        //             }, 400);
        //     }, 7000);
        // }
          // cierra la ventana modal con un boton 
          const btnCloseModalWindow = $('#close-modal-window')
          btnCloseModalWindow.on('click',function(event){
              container.css({
                  display: 'none',
              }).animate({
                      opacity:0
                  }, 400);
                
            clearTimeout(handleTimeout)
          });
    }
/*==========================================================================
            SHOW CONTENT CONTROLLER
===========================================================================*/
    const radioFilter = $('.radio-button-filter');
    radioFilter.on('change', function (event) {
       handleTitleSection(event.target.value);
       handleContentForFilter(event.target.value)
    });
    const handleTitleSection =(filterSelected)=>{
        const titleSectionOptions ={
            'home-visit':'Visitas domésticas',
            'package-delivery':'Entrega de paquetería',
            'employee-visit':'Visitas de empleado'
        }
        const titleSection = $('#title-section')
        titleSection.text(titleSectionOptions[filterSelected])
    }
    const handleContentForFilter=(filterSelected)=>{
        $('.container-tables').removeClass('table-active');
        const sectionActive = $(`#${filterSelected}`)
        sectionActive.addClass('table-active')
    }

/*==========================================================================
                HANDLE HOME VISIT 
===========================================================================*/
    const homeVisitTable = $('#table-home-visit');
    // MANEJA EL ENVIO DE DATOS DE LA TABLA DE VISITAS DOMESTICAS A LA VENTANA MODAL
    $('#table-home-visit tbody').on('click', 'input[type="checkbox"]', function(event) {

        const dataForCheckHomeVisit = dataRowCollection($(this))
        dataForCheckHomeVisit.visitType='home-visit'
        dataForCheckHomeVisit.prevState = parseInt(dataForCheckHomeVisit.state)
        dataForCheckHomeVisit.state = parseInt(dataForCheckHomeVisit.state) + 1;
        dataForCheckHomeVisit.message = dataForCheckHomeVisit.state === 1 ? 'ENTRADA REGISTRADA' : 'SALIDA REGISTRADA';
        if (dataForCheckHomeVisit.state === 2)$(this).prop('disabled', true);
        event.dataForCheckHomeVisit = dataForCheckHomeVisit
        handleModalWindow('check-foreinger',modalWindow,dataForCheckHomeVisit)
    })

    $('#table-home-visit tbody').on('click', 'input[type="checkbox"]', async function(event) {
       try {
            const {id,state}= event.dataForCheckHomeVisit
            const sendCheckHomeVisit = {
                visit_id:id,
                visit_status:state
            }
            const checkHomeVisitRequest = await makeRequest(`${BASE_URL}seguridad/check/home-visit/`,'POST',sendCheckHomeVisit,{})
            if (!checkHomeVisitRequest.ok) throw new Error(checkHomeVisitRequest.error);
            
            handleModalWindow('check-foreinger',modalWindow,event.dataForCheckHomeVisit)
            event.dataForCheckHomeVisit.state===1?$(this).addClass('entry-checked'):$(this).removeClass('entry-checked').prop('disabled',true)
            $(this).parent().attr('data-state', checkHomeVisitRequest.newStatus);
        } catch (error) {
            handleModalWindow('error',modalWindow,error.message)
       }
    })
/*==========================================================================
                HANDLE DELIVERY
===========================================================================*/
    const deliveryTable = $('#table-package-delivery');
    $('#table-package-delivery tbody').on('click', 'input[type="checkbox"]', function(event) {
        const dataForCheckDelivery = dataRowCollection($(this))
        dataForCheckDelivery.visitType='package-delivery'
        dataForCheckDelivery.prevState = parseInt(dataForCheckDelivery.state)
        dataForCheckDelivery.state = parseInt(dataForCheckDelivery.state) + 1;
        dataForCheckDelivery.message = 'PAQUETE RECIBIDO'
        event.dataForCheckDelivery=dataForCheckDelivery
        
    })

    $('#table-package-delivery tbody').on('click', 'input[type="checkbox"]', async function(event) {
        try {
            const {id,state}= event.dataForCheckDelivery
            const sendCheckPackageDelivery = {
                delivery_id:id,
                delivery_status:state
            }
            const checkPackageDeliveryRequest = await makeRequest(`${BASE_URL}seguridad/check/package-delivery/`,'POST',sendCheckPackageDelivery,{})
            if (!checkPackageDeliveryRequest.ok) throw new Error(checkPackageDeliveryRequest.error);
            console.log(event.dataForCheckDelivery);
            handleModalWindow('check-foreinger',modalWindow,event.dataForCheckDelivery)
            if (checkPackageDeliveryRequest.newStatus=== 1)$(this).prop('disabled', true);
            $(this).parent().attr('data-state', checkPackageDeliveryRequest.newStatus)
        } catch (error) {
            handleModalWindow('error',modalWindow,error.message)
        }
    })

/*==========================================================================
                HANDLE EMPLOYEE VISIT
===========================================================================*/
    $('#table-apartament-employees tbody').on('click', 'input[type="checkbox"]', function(event) {

        const dataForCheckEmployee = dataRowCollection($(this))
    
        dataForCheckEmployee.state = parseInt(dataForCheckEmployee.state) + 1;
        dataForCheckEmployee.message = dataForCheckEmployee.state === 1 ? 'ENTRADA REGISTRADA' : 'SALIDA REGISTRADA';
        if (dataForCheckEmployee.state === 2)$(this).prop('disabled', true);
        

        // linea para actualizar el estado 
        // $(this).parent().attr('data-state', dataForCheckEmployee.state)
    
        handleModalWindow('check-foreinger',modalWindow,dataForCheckEmployee)
    })
    function formatDate(fecha) {
        const padStart = (value) => value.toString().padStart(2, '0');
      
        const day = padStart(fecha.getDate());
        const month = padStart(fecha.getMonth() + 1);
        const year = fecha.getFullYear();

        const hours = padStart(fecha.getHours());
        const minutes = padStart(fecha.getMinutes());
    
      
        return {
            date:`${day}-${month}-${year}`,
            hour:`${hours}:${minutes}`
        }
      }

    const dataRowCollection =(currentCheckbox)=>{
        const currentRow = currentCheckbox.closest('.table-row')
        const rowId = currentRow.attr('id')
        let dataForCheck={}
        const dataRowAttributes =['data-apartament-number','data-name','data-state'] 
        dataRowAttributes.forEach((attr) => {
            const attrValue = currentRow.find(`td[${attr}]`).attr(attr);
            dataForCheck[attr.split('-')[1]] = attrValue;
        });
        const {date,hour}=formatDate(new Date())
        return {
            ...dataForCheck,
            'id':rowId,
            date,
            hour
        }
    }
      
      
/*==========================================================================
                HANDLE UNDO ACTION
===========================================================================*/  
modalWindow.on('click','.btn-undo',async function(event){
    try {
        const dataInputsAttributes = ['data-id', 'data-prev-state', 'data-url-to-send'];
        const [visitId, prevState, urlToSend] = $(this).siblings('input').map((index, element) => $(element).attr(dataInputsAttributes[index])).get();
    
        const undoRequest = await makeRequest(`${BASE_URL}seguridad/undo/check/${urlToSend}`, 'POST', { visit_id: visitId, prevState }, {});
        if (!undoRequest.ok) throw new Error(undoRequest.error);
        const $row = $(`#table-${urlToSend} tbody tr#${visitId}`);
        $row.children('td').eq(3).attr('data-state', undoRequest.prevState);

        if (urlToSend === 'home-visit' || urlToSend === 'employe-visit') {
            if (undoRequest.prevState=='0') {
                $row.find('input[type="checkbox"]').removeClass('entry-checked')
            }
        }if(urlToSend==='package-delivery'){
            if (undoRequest.prevState=='0') {
                $row.find('input[type="checkbox"]').prop('disabled',false)
            }
        }
        else if(undoRequest.prevState=='1') {
            $row.find('input[type="checkbox"]').addClass('entry-checked').prop('disabled',false)
        }
    } catch (error) {
        handleModalWindow('error', modalWindow, error.message);
    }
})
 
}(window.jQuery, window, document));
