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
            table.prepend(`
            <tr class='table-row'>
                <td class=''></td>
                <td class="">Hubo un error</td>
                <td class="">${error.message}</td>
                <td class=""></td>
                <td class=""></td>
            </tr>
            `)
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
    // cuentas por pagar
    const accountsPayable = $('#record-for-pay');
    let pageAccountPayable = 0;
    let totalAccountsPayable = 0;
    const monthCheckBox = $('input[name="month"]')
    const yearRadio =$('input[name="year"]')
    const dateYear = new Date().getFullYear()
    const initialYear = $(`input[id="${dateYear}"]`).prop('checked', true);
    
    let countClickOnSubmenuItem=0
    const submenuAccountPayableItem =$('#account-payable-item')
    const tableAccountsPayableTbody = $('#table-accounts-payables tbody')
    const filterItem =$('.filter-item')
    let monthArr =[]
    submenuAccountPayableItem.click(async function(event){
        countClickOnSubmenuItem=countClickOnSubmenuItem+1
        try {
            if (countClickOnSubmenuItem==1) {
                let year=0
                pageAccountPayable=pageAccountPayable+1

                monthCheckBox.each((index,month)=>{
                    if (month.checked) {
                        monthArr.push(month.value)
                    }
                })
                yearRadio.each((index,year)=>{
                    if (year.checked) {
                        console.log(year.value);
                        loadAccountPayable(pageAccountPayable,{
                            year:year.value,
                            monthArr
                        })
                    }
                })
                
            }
        } catch (error) {
            tableAccountsPayableTbody.prepend(`
            <tr class='table-row'>
                <td class='account-payable-suplier-name'></td>
                <td class="invoice_id">Hubo un error</td>
                <td class="invoice_date">${error.message}</td>
                <td class="amount"></td>
                <td class="paid"></td>
            </tr>
            `)
        }
    })
    // let monthClick=0
    // monthCheckBox.click(function(event){
    //     monthClick= monthClick+1
   
    
    // })
    let monthChange=0
    let filterQuery ={}
    filterItem.on('change',function(event){
        const name = event.target.name
        pageAccountPayable=0
        pageAccountPayable=pageAccountPayable+1
        let year;
        if (name ==='month' & !event.target.checked) {
            const currentMonth= $(this)
            monthChange=monthChange+1
            if (monthChange==1) {
                monthCheckBox.each((index,element)=>{
                    if (element.checked  && currentMonth.attr('id')!=element.id) {
                        element.checked=false
                        currentMonth.prop('checked',true)
                        monthArr=[]
                        monthArr.push(currentMonth.val())
                    }
                })   
            }else{
                const indice = monthArr.indexOf(currentMonth.val());
                if (indice !== -1) {
                    monthArr.splice(indice, 1);
                }
            
                const todosDesmarcados =  monthCheckBox.toArray().every(checkbox => !checkbox.checked);

                // Si todos están desmarcados, marca el primero
                if (todosDesmarcados) {
                    monthCheckBox.toArray()[0].checked = true;
                    monthArr.push(1)
                }
            }
        }
        else if (name === 'month' && event.target.checked) {
            monthArr.push(event.target.value)
        }else if(name==='year'){
            filterQuery={
                ...filterQuery,
                [name]:event.target.value
            }
        }else if(name==='paid_status'){
            filterQuery={
                ...filterQuery,
                'paid':event.target.value
            }
        }
        !filterQuery.year? filterQuery.year= new Date().getFullYear().toString(): filterQuery.year=filterQuery.year
        loadAccountPayable(pageAccountPayable,{
            ...filterQuery,
            'monthArr':monthArr
        })


    })
    async function loadAccountPayable(page,queryData) {
        const {year,monthArr,paid}=queryData
        
        try {
            const queryMonths = JSON.stringify(monthArr)
            let queryString =''
            paid?queryString=`page=${page}&queryMonths=${queryMonths}&year=${year}&paid=${paid}`: queryString=`page=${page}&queryMonths=${queryMonths}&year=${year}`
            const accountsPayableList = await makeRequest(`${BASE_URL}admin/accounts/payable/list/?${queryString}`, 'GET', null, {});
            
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
            tableAccountsPayableTbody.prepend(`
            <tr class='table-row'>
                <td class='account-payable-suplier-name'></td>
                <td class="invoice_id">Hubo un error</td>
                <td class="invoice_date">${error.message}</td>
                <td class="amount"></td>
                <td class="paid"></td>
            </tr>
            `)
        }
    }
    // Llamada a la función loadProviders en el evento ready de jQuery
    accountsPayable.scroll(async function (event) {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            console.log('cargar elemento');
        }
    });
});

