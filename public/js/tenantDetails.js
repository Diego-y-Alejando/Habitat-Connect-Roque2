import{validateName, validatePhoneNumber} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest,
    defaultMaintenanceMonth
} from './helpers.js'
$(document).ready(function() {
 


    $("#btn-tenant-edit").click(function(event) {
        event.preventDefault();

        if($("#img-save-tenant").hasClass("hide")){
            $("#img-edit-tenant").addClass("hide");
            $("#img-save-tenant").removeClass("hide");
            $("#input-tenant-name").removeAttr("disabled");
            $("#input-tenant-phone").removeAttr("disabled");
        }
         else{  
            $("#img-save-tenant").addClass("hide");
            $("#input-tenant-name").attr("disabled", "disabled");
            $("#input-tenant-phone").attr("disabled", "disabled");
            $("#img-edit-tenant").removeClass("hide");
            

        }
    });
});

const saveTenant = $('#img-save-tenant')
const tenantInput = $('.tenant-input-form')
let tenantData ={}
let errorsTenant={}
tenantInput.on('change',function(event){
    const {name,value} =event.target
    const errorInput = $(this).siblings('.input-error')
    try {
        
        errorsTenant[name]?delete errorsTenant[name]:errorsTenant={}
        errorInput.text('')
        updateOwnerDataValidations(name,value)
        tenantData={
            ...tenantData,
            [name]:value
        }
        console.log(tenantData,errorsTenant);
    } catch (error) {
        errorsTenant={
            ...errorsTenant,
            [name]:value   
        }
        
        errorInput.removeClass('hide').text(error.message)
    }
})

saveTenant.click(async function(event){
    const resultRequest = $(this).parent().siblings('.result-request')
    const currentUrl = window.location.href;
    const apartamentoIdMatch = currentUrl.match(/\/apartamento\/(\d+)/);
    const id_apartament = apartamentoIdMatch[1];
    try {
    

        if (Object.keys(errorsTenant).length>0) throw new Error('Corrige los errores del formulario'); 
        const updateTenantData  =  await makeRequest(`${BASE_URL}admin/update/tenant/data/${id_apartament}`,'POST', tenantData,{})
        if (!updateTenantData.ok) throw new Error(updateTenantData.error)
        resultRequest.addClass('succes-result').text(updateTenantData.msg)
    
    } catch (error) {
        console.log(error);
        resultRequest.addClass('error-input').text(error.message)
       
    }
})
const updateOwnerDataValidations= (inputName,inputValue)=>{
    const validationObject ={
        'name':(value)=>{
            validateName(value,55)
        },
        'phone_number':(value)=>{
            validatePhoneNumber(value)
        }
    }
    if (validationObject.hasOwnProperty(inputName)) {
        validationObject[inputName](inputValue)

    }else{
        throw new Error(`Input inválido: ${inputName}`);
    }
}

