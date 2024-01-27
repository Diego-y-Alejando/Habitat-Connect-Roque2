import {
    validateName,
    validatePhoneNumber,
    validateBankAccount,
    validateBankName,
    validateTypeAccount,
    validatePaymentMethod,
    validationParagraph
} from './validators.js';

import {
    BASE_URL,
    headers,
    makeRequest
} from './helpers.js';

$(document).ready(function () {

    const suplierTableContainer = $('#suppliers');
    const accountsPayable = $('#record-for-pay');
    let pageSuplier = 0;
    let totalProviders =0;
    const table =$('#table-suppliers tbody')
    async function loadProviders() {
        try {
            
            pageSuplier = pageSuplier + 1;
            const providers = await makeRequest(`${BASE_URL}admin/providers/?page=${pageSuplier}`, 'GET', null, {});
            if (!providers.ok) {
                throw new Error(providers.error)
           }
           
           providers.providers.rows.forEach(({provider_id,provider_name , phone_number, bank_account ,bank_name, type_account}) => {
                table.append(`
                    <tr class='table-row provider' id=${provider_id}>
                        <td class='supplier-name record-supplier-name'>${provider_name}</td>
                        <td>${phone_number}</td>
                        <td>${bank_account}</td>
                        <td>${bank_name}</td>
                        <td>${type_account}</td>
                    </tr>
                `);
            });
            
            totalProviders= providers.providers.count
        } catch (error) {
            console.log(error);
        }
    }

    // Llamada a la función loadProviders en el evento ready de jQuery
    loadProviders();
    
    suplierTableContainer.scroll(async function (event){
        console.log('scroll');
        if (Math.ceil($(this).scrollTop() + $(this).innerHeight() )>= $(this)[0].scrollHeight) {
            pageSuplier=pageSuplier+1
                let totalSupplierRows =$('#table-suppliers tr.provider').length

                if (totalSupplierRows<totalProviders ) {
                    const remainingProviders = await makeRequest(`${BASE_URL}admin/providers/?page=${pageSuplier}`, 'GET', null, {});
                    if (!remainingProviders.ok) {
                        throw new Error(remainingProviders.error)
                    }
                    
                    remainingProviders.providers.rows.forEach(({provider_id,provider_name , phone_number, bank_account ,bank_name, type_account}) => {
                        table.append(`
                            <tr class='table-row provider' id=${provider_id}>
                                <td class='supplier_name record-supplier-name'>${provider_name}</td>
                                <td class='phone_number'>${phone_number}</td>
                                <td class='bank_account'>${bank_account}</td>
                                <td class='bank_name'>${bank_name}</td>
                                <td class='type_account'>${type_account}</td>
                            </tr>
                        `);
                    });
                }else{
                    console.log('asdas');
                }
             
            
        }
    });

    accountsPayable.scroll(async function (event) {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            // hacer la peticion
            console.log('cargar elemento');
        }
    });
});
