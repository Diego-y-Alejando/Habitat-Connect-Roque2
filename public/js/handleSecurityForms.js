import {
    validateName,
    validateDpi,
    ValidationIdOrLevel
} from './validators.js'

import {
    BASE_URL,
    makeRequest,
    handleInputErrors,
    addVisitToTable,
    showRequestFormResult,

} from './helpers.js'
(function($, window, document) {

    const modalWindow=$('#modal-window')
/*==========================================================================
                HANDLE HOME VISIT
===========================================================================*/
    let errosHomevisit ={}
    let dataHomeVisit={}
    modalWindow.on('change','.home-visit-input',function({currentTarget}){
        try {
            errosHomevisit[currentTarget.name]?delete errosHomevisit[currentTarget.name]:errosHomevisit={}
            handleInputErrors(currentTarget,'');
            
            createHomeVisitValidations(currentTarget.name,currentTarget.value);
            dataHomeVisit={
                ...dataHomeVisit,
                [currentTarget.name]:currentTarget.value
            }
            if (currentTarget.name==='apartament_id')dataHomeVisit.apartament_number = currentTarget.options[currentTarget.selectedIndex].text
        } catch (error) {
            errosHomevisit={
                ...errosHomevisit,
                [currentTarget.name]:error.message
            }
            handleInputErrors(currentTarget,error.message)
        }
    })
    
    modalWindow.on('submit','#create-home-visit', async function (event){
        event.preventDefault()
        const btnSubmitHomeVisit =$(event.currentTarget).find('#submit-home-visit')
        try {
            
            const apartament_number= dataHomeVisit.apartament_number
            delete dataHomeVisit.apartament_number
            if (Object.keys(dataHomeVisit).length===0 ||Object.keys(dataHomeVisit).length<4 )throw new Error('Debes completar todos los campos ')
            const homeVisitCreated= await makeRequest(BASE_URL+'seguridad/create/home-visit','POST', dataHomeVisit,{})   
            if (!homeVisitCreated.ok) throw new Error(homeVisitCreated.error)
            homeVisitCreated.visitData ={
                ...homeVisitCreated.visitData,
               data_apartament_number:apartament_number
            }
            addVisitToTable('prepend',$('#table-home-visit tbody'),homeVisitCreated.visitData)
            showRequestFormResult(btnSubmitHomeVisit,homeVisitCreated.msg)
            if (homeVisitCreated.ok) {
                $('.home-visit-input').val('')
                $('.select-form').prop('selectedIndex',0);
                dataHomeVisit={}
            }
            setTimeout(() => {
                showRequestFormResult(btnSubmitHomeVisit,'')
            }, 5000);
        } catch (error) {
            showRequestFormResult(btnSubmitHomeVisit,error.message)
            console.log(error);
        }
   
    })
    const createHomeVisitValidations=(inputName,inputValue)=>{
        const homeVisitValidations ={
            'resident_name':(value)=>{
                validateName(value,30)
            },
            'visitors_name':(value)=>{
                validateName(value,30)

            },
            'dpi':(value)=>{
                validateDpi(value)
            },
            'apartament_id':(value)=>{
                ValidationIdOrLevel('id del apartamento ',value)
            }
        }
        if (homeVisitValidations.hasOwnProperty(inputName)) {
            homeVisitValidations[inputName](inputValue)
    
        }else{
            throw new Error(`Input inválido: ${inputName}`);
        }
    }
    
 
 
   
}(window.jQuery, window, document))