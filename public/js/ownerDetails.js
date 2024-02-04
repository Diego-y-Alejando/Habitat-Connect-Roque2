import{validateName, validatePhoneNumber} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest,
    defaultMaintenanceMonth
} from './helpers.js'
$(document).ready(function() {


    $("#btn-owner-edit").click(function(event) {    
        event.preventDefault();
        if($("#img-save-owner").hasClass("hide")){
            $("#img-edit-owner").addClass("hide");
            $("#img-save-owner").removeClass("hide");
            $("#input-owner-name").removeAttr("disabled");
            $("#input-owner-phone").removeAttr("disabled");

        }
        else{
            $("#img-save-owner").addClass("hide");
            $("#input-owner-name").attr("disabled", "disabled");
            $("#img-edit-owner").removeClass("hide");
            $("#input-owner-phone").attr("disabled", "disabled");
            $("#img-edit-owner").removeClass("hide");
        }       
    });
    const saveOwner = $('#img-save-owner')
    const ownerInput =$('.owner-input-form')
    let ownerData ={}
    let errorsOwner={}
    ownerInput.on('change',function(event){
        const {name,value} =event.target
        const errorInput = $(this).siblings('.input-error')
        try {
            
            errorsOwner[name]?delete errorsOwner[name]:errorsOwner={}
            errorInput.text('')
            updateOwnerDataValidations(name,value)
            ownerData={
                ...ownerData,
                [name]:value
            }
            console.log(ownerData,errorsOwner);
        } catch (error) {
            errorsOwner={
                ...errorsOwner,
                [name]:value   
            }
            
            errorInput.removeClass('hide').text(error.message)
        }
    })
    saveOwner.click(async function(event){
        const currentUrl = window.location.href;
        const apartamentoIdMatch = currentUrl.match(/\/apartamento\/(\d+)/);
        const id = apartamentoIdMatch[1];
    
        const resultRequest = $(this).parent().siblings('.result-request')
        try {

            if (Object.keys(errorsOwner).length>0) throw new Error('Corrige los errores del formulario'); 
            const updateLandordData  =  await makeRequest(`${BASE_URL}admin/update/landlord/data/${id}`,'POST', ownerData,{})
            if (!updateLandordData.ok) throw new Error(updateLandordData.error)
            resultRequest.addClass('succes-result').text(updateLandordData.msg)
        
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
});