
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
            //TO DO Verificar que el localStorage no contenga ningun nivel ya registrado 
            const dataApartaments = await makeRequest(`${BASE_URL}admin/apartamentos/${SelectFilterLevel.value}`, 'GET', null,{});
            apartamentItemGenerator(dataApartaments.level_1,$('#container-grid-apartaments'),BASE_URL);
            localStorage.setItem('apartamentsLevels', JSON.stringify({level_1:dataApartaments.level_1}));
        } catch (error){
            console.log(error);
        }

    })
    //evento para obtener el valor seleccionado del filtro por nivel
    SelectFilterLevel.addEventListener('change', async function(event) {
        try {
            await checkDataApartamentsOnLocalStorage(event.target.value);
        } catch (error) {
            console.log(error);
        }
      });
        // TO DO implementar una forma de hacer que el localStorage expire  
    const checkDataApartamentsOnLocalStorage = async(levelSelected)=>{
        try {
            const dataApartamentOnLocalStorage=JSON.parse(localStorage.getItem('apartamentsLevels'))
            const levelsOnLocalStorage = Object.entries(dataApartamentOnLocalStorage)
            // recorre el arreglo de elementos de la lista apartaments Level
            for (let index = 0; index < levelsOnLocalStorage.length; index++) {
                // verifica si el nivel solicitado existe o no 
                if(!levelsOnLocalStorage[index].includes(`level_${levelSelected}`)){
                    const remaningData =await makeRequest(BASE_URL+'admin/apartamentos/'+levelSelected,'GET',null,{});
                    localStorage.setItem('apartamentsLevels',JSON.stringify({
                        ...dataApartamentOnLocalStorage,
                        ...remaningData
                    }))
                    apartamentItemGenerator(remaningData[`level_${levelSelected}`],$('#container-grid-apartaments'),BASE_URL);
                    return
                }
            }
        } catch (error) {
            throw (error)
        }
        
    }
 }(window.jQuery, window, document));