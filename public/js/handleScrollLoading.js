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

$(document).ready(function () {

    let page =1;
    let currentFilterValue=$('.radio-button-filter').val();
    let totalRecords
    let searchedValue=null
    // CONTROLADOR DEL VALOR DEL FILTRO
    const radioFilter = $('.radio-button-filter');
    radioFilter.on('change', async function (event) {
        currentFilterValue =event.target.value
        await loadData(currentFilterValue,1,'');
        handleSearching(currentFilterValue,1); 
    });
/*==========================================================================
        LOAD DATA HANDLING
===========================================================================*/
    async function loadData(urlToSearch,page,searchedValue){
        try {
        
            const url = searchedValue?`${BASE_URL}seguridad/get/${urlToSearch}/?page=${page}&searchData=${searchedValue}` :`${BASE_URL}seguridad/get/${urlToSearch}/?page=${page}`
            const visitsRecord = await makeRequest(url, 'GET', null, {});
            
            if (!visitsRecord.ok) throw new Error(visitsRecord.error);
            visitsRecord.homeVisits.forEach(homeVisit => {
                addVisitToTable('append',$(`#table-${urlToSearch} tbody`),homeVisit)
            });            
            totalRecords = visitsRecord.count
            page= visitsRecord.currentPage
            console.log('load',page);
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

    loadData(currentFilterValue,page,null);
/*==========================================================================
         BUSCADOR 
===========================================================================*/
    const handleSearching = (urlValue,searchPage)=>{
        $('#search-input').on('change',async function(event){ 
            page=searchPage
            $(`#table-${urlValue} tbody`).empty()
            searchedValue =event.target.value
            await loadData(urlValue,page,searchedValue);
            console.log('change ',page);
            if (searchedValue==='') {
                page=1
                searchedValue=''
            } 
        });
    }
    handleSearching(currentFilterValue,1)
/*==========================================================================
          SCROLL HANDLING
===========================================================================*/
    $(`#${currentFilterValue}`).scroll(async function (event){
        if (Math.ceil($(this).scrollTop() + $(this).innerHeight() )>= $(this)[0].scrollHeight) {
            let totalTableRows =$(`#table-${currentFilterValue} tr.table-row`).length
            if (totalTableRows<totalRecords) {
                page= page + 1
                await loadData(currentFilterValue,page,searchedValue)
            }
        }
    });
})