const BASE_URL = "http://localhost:8080/";

const headers ={
    'Content-Type': 'application/json'      
}

const makeRequest = async (url, method = 'GET', body = null, headers = {}) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json', // Ajustar según sea necesario
                ...headers,
            },
            body: method !== 'GET' ? JSON.stringify(body) : null,
            signal,
        };

        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('La solicitud fue cancelada.');
        } else {
            throw new Error(`Error in makeRequest: ${error.message}`);
        }
    }
};

const apartamentItemGenerator =(apartamentList,containerGridApartaments,BASE_URL)=>{
    const arrayApartament =[]
    apartamentList.forEach(apartament => {
        const apartamentHtml =` 
        <a class="apartament-item ${apartament.ocupation_state==1?'ocupation_state_false':'ocupation_state_false'}" href="${BASE_URL}admin/apartament/${apartament.apartament_id}">
            <h3 class="apartament-number column-span-2 ">Apartamento <span class="special-text-apto">#${apartament.apartament_number}</span></h3>
            <span class="secondary-data column-span-2">Primer nivel| ${apartament.apartamentFeatures.area} mts2</span>
            <img alt="Torre" src="/public/icons/tower.png" class="tower-icon column-1 "/>
            <div class=" container-primary-data column-2">
                <h2 class="apartament-name">${apartament.apartament_name}</h2>
                <h4 class="primary-data">P:${apartament.phone_number_landlord}</h4>
                <h4 class="primary-data">I:${apartament.phone_number_tenant?apartament.phone_number_tenant:'No tiene'}</h4>
                <span class="see-more">Ver más</span>
            </div>
        </a>`
        
        arrayApartament.push(apartamentHtml)
    });
    containerGridApartaments.empty().append(arrayApartament)
}
const formatEventsArray =(eventsArr)=>{
    let newArr=[];
    eventsArr.forEach((event)=>{
      Object.entries(event).forEach(([propertyName,propertyValue])=>{
        if (propertyName === 'start' || propertyName === 'end') {
            const dateStr = `${event['date']} ${event[propertyName]}`;
            const newDate = new Date(dateStr);
            // Verifica si la fecha es válida antes de asignarla
            if (!isNaN(newDate.getTime())) {
                event[propertyName] = newDate;
            } else {
                console.error(`Fecha no válida: ${dateStr}`);
            }

        }if (propertyName==='end') {
            delete event.date
        }
        
      })
       newArr.push(event)
    })
    return newArr
    
}
export{
    BASE_URL,
    headers,
    makeRequest,
    apartamentItemGenerator,
    formatEventsArray
}