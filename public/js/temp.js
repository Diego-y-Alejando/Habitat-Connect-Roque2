import {
    validationEmail,
    validationPassword,
    validationDepartament
}from './validators.js'
import {
  BASE_URL,
  showError,
  setTokenLocalStorage,
  getLocalStorageItem,
  makeRequest,
  redirectTo
}from './helpers.js'
(function($, window, document) {  
    const logginForm = document.getElementById('loggin-form');
    const selectDepartament = document.getElementById('departament');
    const btnLoggin= document.getElementById('btn-loggin');
    const errorSpan = document.getElementById('loggin-error');

    logginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        
        const departamenturl = selectDepartament.value.substring(0, selectDepartament.value.indexOf("-")).toLowerCase();
        const body = new URLSearchParams({
            email:logginForm.email.value,
            password:logginForm.password.value,
            departament:selectDepartament.value
        }).toString();
        
        try{
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
          const data = await makeRequest(BASE_URL+departamenturl+'/loggin','POST',body,headers)
          if (data.ok===false) {
            
            showError(errorSpan,data.error);
          }else{
            setTokenLocalStorage(departamenturl);
            chooseWindowLocation(departamenturl);          
          }
        } catch (error) {
          showError(errorSpan,error.message)
        }
      });

    btnLoggin.addEventListener('click',(event)=>{
      try{
        validationDepartament(selectDepartament.value);
        validationEmail(logginForm.email.value);
        validationPassword(logginForm.password.value)
      } catch (error) {
        event.preventDefault()
        showError(errorSpan,error.message)
      }
    });

const chooseWindowLocation=(departament)=>{
  switch (departament) {
    case 'sales':
      window.location=BASE_URL+departament+'/patients/?page=1'
      break;
    case 'prod':
      window.location=BASE_URL+departament+'/laboratories/?page=1'
      break;
    case 'reception':
      window.location=BASE_URL+departament+'/subtickets/?page=1'
      break;
    case 'med':
      window.location=BASE_URL+departament+'/patients/?page=1'
    break;
    case 'manager':
      window.location=BASE_URL+departament+'/employees/'
    break;
  
    default:
      break;
  }
}

}(window.jQuery, window, document));