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
    let pageSuplier = 0;
    let totalProviders =0;
    const table =$('#table-suppliers tbody')
    async function loadProviders() {
        try {
            
            pageSuplier = pageSuplier + 1;
            const providers = await makeRequest(`${BASE_URL}admin/providers/?page=${pageSuplier}`, 'GET', null, {});
            if (!providers.ok) {
                throw new Error(providers.error);
            }
            providers.providers.rows.forEach(({provider_id,provider_name , phone_number, bank_account ,bank_name, type_account}) => {
                table.append(`
                <tr class='table-row provider' id=${provider_id}>
                    <td class='provider_name'>${provider_name}</td>
                    <td class='phone_number'>${phone_number}</td>
                    <td class='bank_account'>${bank_account}</td>
                    <td class='bank_name'>${bank_name}</td>
                    <td class='type_account'>${type_account}</td>
                </tr>
                `);
            });
            totalProviders= providers.providers.count;
        } catch (error) {
            console.log(error);
        }
    }

    // Llamada a la función loadProviders en el evento ready de jQuery
    loadProviders();
    
    suplierTableContainer.scroll(async function (event){
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
                            <td class='provider_name'>${provider_name}</td>
                            <td class='phone_number'>${phone_number}</td>
                            <td class='bank_account'>${bank_account}</td>
                            <td class='bank_name'>${bank_name}</td>
                            <td class='type_account'>${type_account}</td>
                        </tr>
                    `);
                });
            }        
        }
    });
    const accountsPayable = $('#record-for-pay');
    let pageAccountPayable = 0;
    let totalAccountsPayable = 0;
    const yearFilter =$('input[name="year"]');
    const monthFilter= $('input[name="month"]');
    const paidStatusFilter =$('input[name="paid_status"]');
    const dateYear = new Date().getFullYear()
    const initialYear = $(`input[id="${dateYear}"]`).prop('checked', true);
    let filterQuery ={}
    let countClickOnSubmenuItem=0
    const submenuAccountPayableItem =$('#account-payable-item')
    const tableAccountsPayableTbody = $('#table-accounts-payables tbody')
    submenuAccountPayableItem.click(async function(event){
        countClickOnSubmenuItem=countClickOnSubmenuItem+1
        try {
            if (countClickOnSubmenuItem==1) {
                pageAccountPayable=pageAccountPayable+1
                loadAccountPayable(pageAccountPayable,{
                    start_range_date: `${dateYear}-01-02`,
                    end_range_date:`${dateYear}-12-31`
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
    yearFilter.on('change',function(event){
        console.log(event.target.value);
        filterQuery={
            ...filterQuery,
            [event.target.name]:event.target.value
        }
    })
    monthFilter.on('change', function(event){
        filterQuery={
            ...filterQuery,
            [event.target.name]:event.target.value
        }
    })
    paidStatusFilter.on('change',function(event){
        filterQuery={
            ...filterQuery,
            [event.target.name]:event.target.value
        }
    })
    async function loadAccountPayable(page,queryData) {
        const {start_range_date,end_range_date,paid}=queryData
        let queryString=''
        try {
            paid?
                queryString=`?page=${page}&start_range_date=${start_range_date}&end_range_date=${end_range_date}&paid=${paid}` 
            :   queryString=`?page=${page}&start_range_date=${start_range_date}&end_range_date=${end_range_date}` 

            const accountsPayableList = await makeRequest(`${BASE_URL}admin/accounts/payable/list/${queryString}`, 'GET', null, {});
         
            if (!accountsPayableList.ok) {
                throw new Error(accountsPayableList.error)
            }
            tableAccountsPayableTbody.empty()
            accountsPayableList.accountsPayableList.rows.forEach(({account_id,invoice_date,amount ,paid, invoice_id ,accountHaveProvider}) => {
                
                tableAccountsPayableTbody.append(`
                    <tr class='table-row' id=${account_id}>
                        <td class='account-payable-suplier-name'>${accountHaveProvider.provider_name}</td>
                        <td class="invoice_id">${invoice_id}</td>
                        <td class="invoice_date">${invoice_date}</td>
                        <td class="amount">${amount}</td>
                        <td class="paid"><input type="checkbox" id="${invoice_id}" ${paid == 1 ? 'checked' : ''}><label class="label-filter" for="${invoice_id}"></label></td>
                    </tr>
                `);
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    // Llamada a la función loadProviders en el evento ready de jQuery
    accountsPayable.scroll(async function (event) {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            console.log('cargar elemento');
        }
    });
});
