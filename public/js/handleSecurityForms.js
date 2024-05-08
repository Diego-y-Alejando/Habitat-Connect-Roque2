import {
    validateName,
    validateDpi,
    ValidationIdOrLevel,
    validateCompanyName
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
            
            validations(currentTarget.name,currentTarget.value);
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

    modalWindow.on('submit','#form-create-home-visit', async function (event){
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
          
        }
   
    })
   

/*==========================================================================
          PACKAGE DELIVERY
===========================================================================*/
    let errorsPackageDelivery ={}
    let dataPackageDelivery={}
    modalWindow.on('change','.package-delivery-input',function({currentTarget}){
        try {
            errorsPackageDelivery[currentTarget.name]?delete errorsPackageDelivery[currentTarget.name]:errorsPackageDelivery={}
            handleInputErrors(currentTarget,'');
            validations(currentTarget.name,currentTarget.value);
            dataPackageDelivery={
                ...dataPackageDelivery,
                [currentTarget.name]:currentTarget.value
            }
            if (currentTarget.name==='apartament_id')dataPackageDelivery.apartament_number = currentTarget.options[currentTarget.selectedIndex].text
        } catch (error){
            errorsPackageDelivery={
                ...errorsPackageDelivery,
                [currentTarget.name]:error.message
            }
            handleInputErrors(currentTarget,error.message)
        }
    })
    modalWindow.on('submit','#form-create-package-delivery', async function (event){
        event.preventDefault()
        const btnSubmitPackageDelivery =$(event.currentTarget).find('#submit-package-delivery')
        try {
           
            const apartament_number= dataPackageDelivery.apartament_number
            delete dataPackageDelivery.apartament_number
            if (Object.keys(dataPackageDelivery).length===0 ||Object.keys(dataPackageDelivery).length<3 )throw new Error('Debes completar todos los campos ')
            const packageDeliveryCreated= await makeRequest(BASE_URL+'seguridad/create/package-delivery','POST', dataPackageDelivery,{})   
            if (!packageDeliveryCreated.ok) throw new Error(packageDeliveryCreated.error)
                packageDeliveryCreated.packageDeliveryData ={
                    ...packageDeliveryCreated.packageDeliveryData,
                   data_apartament_number:apartament_number
                }
            addVisitToTable('prepend',$('#table-package-delivery tbody'),packageDeliveryCreated.packageDeliveryData)
            showRequestFormResult(btnSubmitPackageDelivery,packageDeliveryCreated.msg)
            if (packageDeliveryCreated.ok) {
                $('.package-delivery-input').val('')
                $('.select-form').prop('selectedIndex',0);
                dataPackageDelivery={}
            }
            setTimeout(() => {
                showRequestFormResult(btnSubmitPackageDelivery,'')
            }, 5000);
        } catch (error) {
            showRequestFormResult(btnSubmitPackageDelivery,error.message)
        }
    })
    const validations=(inputName,inputValue)=>{
        const objectValidations ={
            'resident_name':(value)=>{
                validateName(value,30)
            },
            'visitors_name':(value)=>{
                validateName(value,30)

            },
            'company_name':(value)=>{
                validateCompanyName(value)
            },
            'dpi':(value)=>{
                validateDpi(value)
            },
            'apartament_id':(value)=>{
                ValidationIdOrLevel('id del apartamento ',value)
            }
        }
        if (objectValidations.hasOwnProperty(inputName)) {
            objectValidations[inputName](inputValue)
    
        }else{
            throw new Error(`Input inválido: ${inputName}`);
        }
    }
   
}(window.jQuery, window, document))