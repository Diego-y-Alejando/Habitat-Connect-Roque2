import {
    validateName,
    validatePhoneNumber,
    validateBankAccount,
    validateBankName,
    validateTypeAccount,
    validatePaymentMethod,
    validationParagraph
} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest
} from './helpers.js'
(function($, window, document) {  
console.log('handleFinanceForms.js');
/* 
    Crear proveedor
*/
let dataProvider ={}
let errorsProvider ={}
const createProviderForm = $('#create-provider-form')
const providersInput = $('.providers-input');
const editProviderForm =$('#edit-provider-form')
providersInput.on('change',function({currentTarget}){
    const siblingErrorSpan = $(currentTarget).siblings('span')
    try {
        errorsProvider[currentTarget.name]?delete errorsProvider[currentTarget.name]:errorsProvider={}
        if(siblingErrorSpan.length>0){
            siblingErrorSpan.text('')
        }
        providerValidation(currentTarget.name,currentTarget.value)
        dataProvider={
            ...dataProvider,
            [currentTarget.name]:currentTarget.value
        }
    } catch (error) {
        errorsProvider={
            ...errorsProvider,
            [currentTarget.name]:error.message
        } 
        if(siblingErrorSpan.length==0){
            $(`<span class="error-input col-span-2">${errorsProvider[currentTarget.name]}</span>`).insertAfter($(currentTarget));
        }else{
            siblingErrorSpan.text(error.message)
        }   
    }
})
createProviderForm.on('submit', async function(event){
    event.preventDefault()
    const resultOfRequestElement = $('<span class="result-request "></span>');

    try {
        if (Object.keys(dataProvider).length===0) {
            throw new Error('No puedes enviar un proveedor vacío')
        }
        if (Object.keys(errorsProvider).length > 0) {
            throw new Error('Corrige los errores del formulario')
        }else{
            const createProvider = await makeRequest(BASE_URL+'admin/create/provider/','POST', dataProvider,{})
            if (!createProvider.ok)throw new Error(createProvider.error)
            if($(this).find('span.result-request').length==0){
                resultOfRequestElement.text(createProvider.msg);
                resultOfRequestElement.addClass('succes-result');
                resultOfRequestElement.insertBefore($(this).find('.btn-submit'));

            }else{
                $(this).find('span.result-request').removeClass('error-input').addClass('succes-result').text(createProvider.msg)
            }
            const table = $("#table-suppliers tbody");
            [createProvider.data].forEach(({provider_id,provider_name , phone_number, bank_account ,bank_name, type_account}) => {
                table.prepend(`
                    <tr class='table-row' id=${provider_id}>
                        <td class='supplier-name record-supplier-name'>${provider_name}</td>
                        <td>${phone_number}</td>
                        <td>${bank_account}</td>
                        <td>${bank_name}</td>
                        <td>${type_account}</td>
                    </tr>
                `);
            });
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



const providerValidation =(inputName,inputValue)=>{

   const providerDataValidations={ 
        'provider_name':(value)=>{
            validateName(value,75)
        },  
        'phone_number':(value)=>{
            validatePhoneNumber(value)
        }, 
        'bank_account':(value)=>{
            validateBankAccount(value)
        }, 
        'bank_name':(value)=>{
            validateBankName(value)
        }, 
        'type_account':(value)=>{
            validateTypeAccount(value)
        }, 
        'payment_methods':(value)=>{
            validatePaymentMethod(value)
        }, 
        'service_description':(value)=>{
            validationParagraph(value)
        }
    }
    if (providerDataValidations.hasOwnProperty(inputName)) {
        providerDataValidations[inputName](inputValue)

    }else{
        throw new Error(`Input inválido: ${inputName}`);
    }
}

}(window.jQuery, window, document));