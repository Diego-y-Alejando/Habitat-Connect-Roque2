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
    makeRequest,
    addVisitToTable
} from './helpers.js';

$(document).ready(async function () {

    let page =1;
    const searchInput =$('#search-input')
    let currentFilterValue=$('.radio-button-filter').val();
    let totalRecords
    let searchedValue=null
    let totalPages

    const radioFilter = $('.radio-button-filter');
    /*==========================================================================
    LOAD DATA HANDLING
    ===========================================================================*/
    async function loadData(urlToSearch,page,searchedValue){
        try {
            console.log('se ejecuto load ');
            const url = searchedValue?`${BASE_URL}seguridad/get/${urlToSearch}/?page=${page}&searchData=${searchedValue}` :`${BASE_URL}seguridad/get/${urlToSearch}/?page=${page}`
            const visitsRecord = await makeRequest(url, 'GET', null, {});
            if (!visitsRecord.ok) throw new Error(visitsRecord.error);
            if(visitsRecord.allRows.length>0){
                visitsRecord.allRows.forEach(visit => {
                    addVisitToTable('append',$(`#table-${urlToSearch} tbody`),visit)
                });            

            }
            totalPages= visitsRecord.totalPages
            totalRecords = visitsRecord.count
            return visitsRecord.currentPage
        } catch (error) {
            $(`#table-${urlToSearch} tbody`).append(`
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
    
     await loadData(currentFilterValue,page,null);
   

        
 
    
/*==========================================================================
        SCROLL HANDLING
===========================================================================*/
    $(`#${currentFilterValue}`).scroll(async function (event){
        if (Math.ceil($(this).scrollTop() + $(this).innerHeight() )>= $(this)[0].scrollHeight) {
            let totalTableRows =$(`#table-${currentFilterValue} tr.table-row`).length
            if (totalTableRows<totalRecords || page<totalPages) {
                page=page+1
                await loadData(currentFilterValue,page,searchedValue)
            }
        }
    });
/*==========================================================================
        FECTH FILTER CHANGE 
===========================================================================*/
    radioFilter.on('change', async function (event) {
        currentFilterValue =event.target.value
        searchedValue=''
        $(`#table-${currentFilterValue} tbody`).empty();
        page=1
        await loadData(currentFilterValue,page,searchedValue);
        
    });
/*==========================================================================
        BUSCADOR 
===========================================================================*/
    
    searchInput.on('input',async function(event){ 
        $(`#table-${currentFilterValue} tbody`).empty()
        page=1
        searchedValue =event.target.value
        await loadData(currentFilterValue,page,searchedValue);
    });
 
})