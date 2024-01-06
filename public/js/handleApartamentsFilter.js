
import {
    BASE_URL,
    headers,
    makeRequest,
    apartamentItemGenerator
} from './helpers.js'
(function($, window, document) {

    const SelectFilterLevel = document.getElementById('filter-level');
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Verificar que el localStorage no contenga ningun nivel ya registrado 
            const dataApartaments =await makeRequest(BASE_URL+'admin/apartamentos/'+SelectFilterLevel.value,'GET',null,headers);
            apartamentItemGenerator(dataApartaments.level_1,$('#container-grid-apartaments'),BASE_URL);
            localStorage.setItem('apartamentsLevels', JSON.stringify({level_1:dataApartaments.level_1}));
           
           
        } catch (error) {
            console.log(error);
        }

    })
    SelectFilterLevel.addEventListener('change', async function(event) {
        // Obtener el valor seleccionado
     
        // implementar una forma de hacer que el localStorage expire  

        
        const levelSelected = event.target.value;
        const level =JSON.parse(localStorage.getItem('apartamentsLevels'))
        const levelsOnLocalStorage = Object.entries(level)
        for (let index = 0; index < levelsOnLocalStorage.length; index++) {
            if(!levelsOnLocalStorage[index].includes(`level_${levelSelected}`)){
                const remaningData =await makeRequest(BASE_URL+'admin/apartamentos/'+levelSelected,'GET',null,headers);
                let levels =(JSON.parse(localStorage.getItem('apartamentsLevels')))
                const newDataToLocalStorage = {
                    ...levels,
                    ...remaningData
                }
                localStorage.setItem('apartamentsLevels',JSON.stringify(newDataToLocalStorage))
                apartamentItemGenerator(remaningData[`level_${levelSelected}`],$('#container-grid-apartaments'),BASE_URL);

                return
            }
        }
      });




 }(window.jQuery, window, document));