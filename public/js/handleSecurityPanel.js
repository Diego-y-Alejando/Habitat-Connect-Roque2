import {
    BASE_URL,
    headers,
    makeRequest,
    apartamentItemGenerator
} from './helpers.js'
(function($, window, document) {

    const buttonCreateElement=$('#create-home-visit');
    const modalWindow = $('#modal-window')
    const buttonCreateDelivery =$('#create-delivery')
   
    buttonCreateElement.on('click',function(event){
        handleModalWindow('create-home-visit',modalWindow,null)
    });
    buttonCreateDelivery.on('click',function(event){
        handleModalWindow('create-delivery',modalWindow,null)
    });
    const handleModalWindow =(typeContent,container,dataForCheck)=>{
        const contentsModalWindow ={
            // formulario de crear visita domestica 
            'create-home-visit':`
                <form class="form-modal-window">
                    <h3 class="title-form">Creando visita doméstica</h3>
                    <select class="select-form" name="apartament_id">
                        <option class="option-select" disabled selected>Apartamento que visita</option>
                        <option class="option-select" value="">1-6</option>
                        <option class="option-select" value="">1-7</option>
                    </select>
                    <label class="label-modal-form ">
                        <input type="text" class="input-form" placeholder="Nombre del residente">
                    </label>
                    <label class="label-modal-form ">
                        <input type="text" class="input-form" placeholder="Nombre del visitante">
                    </label>
                    <label class="label-modal-form ">
                        <input type="text" class="input-form" placeholder="Identificacion del visitante">
                    </label>
                    <div class="container-buttons">
                        <input type="button" class="btn-form btn-submit " value="Guardar">
                        <input type="button" class="btn-form btn-cancel " value="Cancelar" id="close-modal-window">
                    </div>
                </form>`,
            //formulario de crear delivery 
            'create-delivery': `
                <form class="form-modal-window">
                    <h3 class="title-form">Creando entrega de paquete</h3>
                    <select class="select-form" name="apartament_id">
                        <option class="option-select" disabled selected>Apartamento que recibe</option>
                        <option class="option-select" value="">1-6</option>
                        <option class="option-select" value="">1-7</option>
                    </select>
                    <label class="label-modal-form ">
                        <input type="text" class="input-form" placeholder="Nombre del residente">
                    </label>
                    <label class="label-modal-form ">
                        <input type="text" class="input-form" placeholder="Nombre de la empresa">
                    </label>
                    <div class="container-buttons">
                        <input type="button" class="btn-form btn-submit " value="Guardar">
                        <input type="button" class="btn-form btn-cancel " value="Cancelar" id="close-modal-window">
                    </div>
                </form>`,
            'check-foreinger':(object)=>{
                return `
                <div class="container-check-item">
                    <img class="check-icon" src="../icons/marca-de-verificacion png.png">
                    <h3 class="check-title">${object.message}</h3>
                    <span class="apartament-number">Apartamento # ${object.apartament}</span>
                    <span class="foreinger-name">${object.name}</span>  
                    <span class="field-name">Fecha :</span>
                    <spa class="field-value">${object.date}</spa>
                    <span class="field-name">Hora :</span>
                    <spa class="field-value">${object.hour}</spa>
                    <input type="hidden" id="${object.id}" data-state="${object.state}">
                    <button class="btn-undo" id="close-modal-window"><strong>Deshacer</strong> acción</button>
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
        if (dataForCheck) {
            console.log('true');
            handleTimeout = setTimeout(() => {
                container.css({
                    display: 'none',
                }).animate({
                        opacity:0
                    }, 400);
            }, 7000);
           
        }
          // cierra la ventana modal con un boton 
          const btnCloseModalWindow = $('#close-modal-window')
          btnCloseModalWindow.on('click',function(event){
            console.log('click');
              container.css({
                  display: 'none',
              }).animate({
                      opacity:0
                  }, 400);
                
            clearTimeout(handleTimeout)
          });
    }

    const radioFilter = $('.radio-button-filter');
    radioFilter.on('change', function (event) {
       handleTitleSection(event.target.value);
       handleContentForFilter(event.target.value)
    });
    const handleTitleSection =(filterSelected)=>{
        const titleSectionOptions ={
            'home-visit':'Visitas domésticas',
            'delivery':'Entrega de paquetería',
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

        dataForCheckHomeVisit.state = parseInt(dataForCheckHomeVisit.state) + 1;
        dataForCheckHomeVisit.message = dataForCheckHomeVisit.state === 1 ? 'ENTRADA REGISTRADA' : 'SALIDA REGISTRADA';
        if (dataForCheckHomeVisit.state === 2)$(this).prop('disabled', true);
        

        // linea para actualizar el estado 
        // $(this).parent().attr('data-state', dataForCheckHomeVisit.state)
       
        handleModalWindow('check-foreinger',modalWindow,dataForCheckHomeVisit)
    })

    $('#table-delivery tbody').on('click', 'input[type="checkbox"]', function(event) {
        // aqui se maneja la peticion
    })
/*==========================================================================
                HANDLE DELIVERY
===========================================================================*/
    const deliveryTable = $('#table-delivery');
    $('#table-delivery tbody').on('click', 'input[type="checkbox"]', function(event) {
        const dataForCheckDelivery = dataRowCollection($(this))
    
        dataForCheckDelivery.state = parseInt(dataForCheckDelivery.state) + 1;
        dataForCheckDelivery.message = 'PAQUETE RECIBIDO'
        if (dataForCheckDelivery.state === 1)$(this).prop('disabled', true);
        // $(this).parent().attr('data-state', dataForCheckDelivery.state)

        handleModalWindow('check-foreinger',modalWindow,dataForCheckDelivery)
    })

    $('#table-delivery tbody').on('click', 'input[type="checkbox"]', function(event) {
            //se maneja la peticion 
    })

/*==========================================================================
                HANDLE EMPLOYEE VISIT
===========================================================================*/
    $('#table-apartament-employees tbody').on('click', 'input[type="checkbox"]', function(event) {

        const dataForCheckEmployee = dataRowCollection($(this))
        console.log(dataForCheckEmployee);
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
      
      
     
 
}(window.jQuery, window, document));