import {
    validateName,
    validatePhoneNumber,
    validateBankAccount,
    validateBankName,
    validateTypeAccount,
    validatePaymentMethod,
    validationParagraph,
    ValidationIdOrLevel,
    validationDates
} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest
} from './helpers.js'
(function($, window, document) {  

/* =======================
    Crear proveedor
========================== */
let dataProvider ={}
let errorsProvider ={}
const createProviderForm = $('#create-provider-form')
const providersInput = $('.providers-input');
const editProviderForm =$('#edit-provider')
const iconSaveEditProvider =$('#icon-save-edit-supplier')
const tableSuppliersTbody =$('#table-suppliers tbody')
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
            [createProvider.data].forEach(({provider_id,provider_name , phone_number, bank_account ,bank_name, type_account}) => {
                tableSuppliersTbody.prepend(`
                    <tr class='table-row' id=${provider_id}>
                        <td class='provider_name record-supplier-name'>${provider_name}</td>
                        <td class="phone_number">${phone_number}</td>
                        <td class="bank_account">${bank_account}</td>
                        <td class="bank_name">${bank_name}</td>
                        <td class="type_account">${type_account}</td>
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

iconSaveEditProvider.click(async function(event){
    
    const resultOfRequestElement = $('<span class="result-request"></span>');
    try {
        console.log('se envio',dataProvider);
        if (Object.keys(errorsProvider).length > 0) {
            throw new Error('Corrige los errores del formulario')
        }
        if(Object.keys(dataProvider).length==0) {
            throw new Error('No has edidado al proveedor')
        }
        
            const provider_id =$('#supplier_id').val()
            const editProvider = await makeRequest(BASE_URL+'admin/update/provider/'+provider_id,'POST', dataProvider,{});
            console.log(editProvider);
            if (!editProvider.ok) {
                throw new Error(editProvider.error)
            }
            const rowEdit = tableSuppliersTbody.find(`#${provider_id}`).find('td')
            if($(this).parent().find('span.result-request').length==0){
                resultOfRequestElement.text(editProvider.msg);
                resultOfRequestElement.addClass('succes-result');
                $(this).parent().prepend(resultOfRequestElement);

            }else{
                $(this).parent().find('span.result-request').removeClass('error-input').addClass('succes-result').text(editProvider.msg)
            }
            rowEdit.each((index, field)=>{
                if (editProvider.updatedData[field.classList[0]]) {
                    field.textContent=editProvider.updatedData[field.classList[0]]
                }
            })
        
    } catch (error) {
      
        if($(this).parent().find('span.result-request').length == 0){
            resultOfRequestElement.text(error.message);
            resultOfRequestElement.addClass('error-input');
            $(this).parent().prepend(resultOfRequestElement);
        }else{
            $(this).parent().find('span.result-request').removeClass('succes-result').addClass('error-input').text(error.message);
        }
    }
})
// CERRAR LA VENTANA MODAL DE CREAR PROVEEDOR
$("#Return-suppliers").click(function(event) {
    $("#edit-supplier").addClass("hide");
    $("#edit-supplier").animate({
        opacity:0
    },400);
    dataProvider ={}
    errorsProvider ={}
    $('.result-request').text('')
});
/* =======================
    Crear CUENTA POR PAGAR
========================== */

let dataAccountPayable ={}
let errorsAccountPyable ={}
const createAccountPayableForm = $('#create-account-payable-form')
const accountPayableInput = $('.account-payable-input');
const tableAccountsPayableTbody = $('#table-accounts-payables tbody')
accountPayableInput.on('change',function({currentTarget}){
    const siblingErrorSpan = $(currentTarget).siblings('span')
   
    try {
        errorsAccountPyable[currentTarget.name]?delete errorsAccountPyable[currentTarget.name]:errorsAccountPyable={}
        if(siblingErrorSpan.length>0){
            siblingErrorSpan.text('')
        }
        if (currentTarget.name==='paid') {currentTarget.checked? currentTarget.value=1 :currentTarget.value=2}     
        updatedAccountPayableValidations(currentTarget.name,currentTarget.value)
        dataAccountPayable={
            ...dataAccountPayable,
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

createAccountPayableForm.on('submit',async function(event){
    event.preventDefault()
    const resultOfRequestElement = $('<span class="result-request "></span>');
    try {
        if (Object.keys(dataAccountPayable).length===0) throw new Error('No puedes enviar una cuenta por pagar  vacía')
        if (Object.keys(errorsAccountPyable).length > 0)throw new Error('Corrige los errores del formulario')
        const createAccountPayable = await makeRequest(BASE_URL+'admin/create/account/payable','POST', dataAccountPayable,{})
        if (!createAccountPayable.ok)throw new Error(createAccountPayable.error)
        if($(this).find('span.result-request').length==0){
            resultOfRequestElement.text(createAccountPayable.msg);
            resultOfRequestElement.addClass('succes-result');
            resultOfRequestElement.insertBefore($(this).find('.btn-submit'));
        }else{
            $(this).find('span.result-request').removeClass('error-input').addClass('succes-result').text(createAccountPayable.msg)
        }
        [createAccountPayable.data].forEach(({account_id,invoice_date,amount ,paid, invoice_id ,provider_name, id_provider_account, provider_id}) => {
            tableAccountsPayableTbody.prepend(`
                <tr class='table-row' id=${account_id}>
                    <td class="account-payable-suplier-name">${provider_name}</td>
                    <td class="invoice_id">${invoice_id}</td>
                    <td class="invoice_date">${invoice_date}</td>
                    <td class="amount">${amount}</td>
                    <td class="paid"><input type="checkbox" id="${invoice_id}" ${paid == 1 ? 'checked' : ''}><label class="label-filter" for="${invoice_id}"></label></td>
                </tr>
            `);
        });
        
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
$('#btn-edit-record').on('click', '.save-edit-account-payable', async function(event){
    event.preventDefault();
    const resultOfRequestElement = $('<span class="result-request"></span>');
    try {
        if (Object.keys(dataAccountPayable).length === 0) throw new Error('No has editado la cuenta');
        if (Object.keys(errorsAccountPyable).length > 0) throw new Error('Corrige los errores del formulario');

        const account_id = $('#account_payable_id').val();
        const updateAccountPayable = await makeRequest(BASE_URL + 'admin/update/account/payable/' + account_id, 'POST', dataAccountPayable, {});
        
        if (!updateAccountPayable.ok) throw new Error(updateAccountPayable.error);

        const rowEdit = tableAccountsPayableTbody.find(`#${account_id}`).find('td');
        
        if ($(this).parent().find('span.result-request').length == 0) {
            resultOfRequestElement.text(updateAccountPayable.msg);
            resultOfRequestElement.addClass('succes-result');
            $(this).parent().prepend(resultOfRequestElement);
        } else {
            $(this).parent().find('span.result-request').removeClass('error-input').addClass('succes-result').text(updateAccountPayable.msg);
        }
        rowEdit.each((index, field)=>{
            if (updateAccountPayable.updatedData[field.classList[0]]) {
                field.textContent=updateAccountPayable.updatedData[field.classList[0]]
            } 
        })
        if (updateAccountPayable.updatedData['id_provider_account']) {
           rowEdit[0].textContent= $('#select-edit-provider_name option[value="' + updateAccountPayable.updatedData.id_provider_account + '"]').text();
        }
    } catch (error) {
        if ($(this).parent().find('span.result-request').length == 0) {
            resultOfRequestElement.text(error.message);
            resultOfRequestElement.addClass('error-input');
            $(this).parent().prepend(resultOfRequestElement);
        } else {
            $(this).parent().find('span.result-request').removeClass('succes-result').addClass('error-input').text(error.message);
        }
    }
});


$('.cerrar-ventana').on('click', function(event){
    event.preventDefault()
    dataAccountPayable ={}
    errorsAccountPyable ={}
    dataProvider ={}
    errorsProvider ={}
    const closeContainer =$(this).closest('.modal-window');
    $('.input-finance-forms').val('')
    $('.result-request').text('')
    $(".select-finance-form").prop("selectedIndex", 0);
    closeContainer.animate({
        opacity:0
    }, 400).css({
        display: 'none',
    });
})

const updatedAccountPayableValidations =(inputName,inputValue)=>{
    const accountPayableDataValidations ={
        'invoice_id':(value)=>{
            validationInvoiceId(value)
        },
        'invoice_date':(value)=>{
            validationDates(value,'fecha de factura')
        },
        'concept':(value)=>{
            validationParagraph(value);
        },
        'amount':(value)=>{
            validationAmount(value)
        },
        'number_of_transaction':(value)=>{
            validationNumberOfTransaccion(value)
        },  
        'paid':(value)=>{
            validationPaidStatus(value)
        },
        'id_provider_account':(value)=>{
            ValidationIdOrLevel('id del proveedor ',value)
        },
        'id_bank_account':(value)=>{
            ValidationIdOrLevel('id de la cuenta ',value)
        },
       
    }
    if (accountPayableDataValidations.hasOwnProperty(inputName)) {
        accountPayableDataValidations[inputName](inputValue)

    }else{
        throw new Error(`Input inválido: ${inputName}`);
    }
}

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
// validaciones de cuenta porpagar 
const validationInvoiceId=(invoice_id)=>{
    const regexInvoiceId =/^[a-zA-Z0-9]+$/

    if (!invoice_id) {
        throw new Error('El número de factura no puede venir vacío')
    }if (!regexInvoiceId.test(invoice_id)) {
        throw new Error('El número de factura contiene caractéres inválidos')
    }
}
const validationAmount =(amount)=>{
    const regexAmount = /^[\d]{1,5}[.][\d]{2}/
    if (!amount) {
        throw new Error('El monto de la cuenta no puede venir vacío');
    }
    if (!regexAmount.test(amount)) {
        throw new Error('El precio debe ser en este formato 0.00')
    }
}
const validationNumberOfTransaccion= (number_of_transaction)=>{
    const regexNumberOfTransaccion=/^[\d]{1,3}/
    if (!number_of_transaction) {
        throw new Error('El número de transaccion no debe venir vacio')
    }
    if (!regexNumberOfTransaccion.test(number_of_transaction)) {
        throw new Error('El número de transaccion solo debe incluir números')
    }
}
const validationPaidStatus =(paid)=>{
    const regexPaidStatus=/^1|2/

    if (!paid) {
        throw new Error('La cuenta debe estar registrada como pagada o no pagada su estado no puede venir vacío')
    }
    if (!regexPaidStatus.test(paid)) {
        throw new Error('El estatus de pago de la cuenta trae caractéres inválidos ')
    }
}
}(window.jQuery, window, document));