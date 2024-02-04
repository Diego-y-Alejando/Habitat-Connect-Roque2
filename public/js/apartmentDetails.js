import{validateName} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest,
    defaultMaintenanceMonth
} from './helpers.js'
$(document).ready(function() {

    const currentUrl = window.location.href;
    const apartamentoIdMatch = currentUrl.match(/\/apartamento\/(\d+)/);
    const id = apartamentoIdMatch[1];

    const inputApartamentName = $('#input-family')
    const isInhabited = $('#ocupay-checkbox')
    let newName ={}
    let errors={}
    inputApartamentName.on('change', function(event){
        try {
            $("#error-input-family-name").addClass("hide");
            $("#input-family").removeClass("error");
            validateName(event.target.value,55)

            newName={
                ...newName,
                [event.target.name]:event.target.value
            }
        } catch (error) {

            errors={
                ...errors,
                [event.target.name]:event.target.value
            }
            $("#input-family").addClass("error");
            $("#error-input-family-name").removeClass("hide");
            $("#error-input-family-name").text(error.message);
        }
    })
    $(".container-item").hide();
    $("#apartment-data").show();



    $('#btn-family-edit').click(async function(event) {  
        event.preventDefault();

        if($("#img-save-family").hasClass("hide")){
            $("#img-edit-family").addClass("hide");
            $("#img-save-family").removeClass("hide");
            $("#input-family").removeAttr("disabled");
        }
        else{

            try{
                $("#input-family").removeClass("error");
                $("#img-save-family").addClass("hide");
                $("#input-family").attr("disabled", "disabled");
                $("#img-edit-family").removeClass("hide");
                if (Object.keys(newName).length>0) {
                    const updateApartamentName = await makeRequest(BASE_URL+'admin/update/apartament/name/'+id,'POST', newName,{})
                    if (!updateApartamentName.ok) throw new Error(updateApartamentName.error)
                    $("#error-input-family-name").removeClass("hide");
                    $("#error-input-family-name").text(updateApartamentName.msg);
                }
          
            }catch(error){
                $("#input-family").addClass("error");
                $("#error-input-family-name").removeClass("hide");
                $("#error-input-family-name").text(error.message);
            }
        
            $("#img-save-family").addClass("hide");
            $("#input-family").attr("disabled", "disabled");
            $("#img-edit-family").removeClass("hide");
    
        }
    });
    // marcar como habitado o  no 

    isInhabited.on('change', async function (event){
        try {
            let ocupation_state;
            const checked = event.target.checked
            checked ? ocupation_state=1:ocupation_state=0
            const updateOcupationState = await makeRequest(BASE_URL+'admin/update/ocupation/state/'+id,'POST', {ocupation_state},{})
            if(!updateOcupationState.ok) throw new Error (updateOcupationState.error)
            $('#modal-result').text(updateOcupationState.msg).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('')
                // Puedes agregar más acciones después de que la animación haya terminado
              });
            
        } catch (error) {
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('')
                // Puedes agregar más acciones después de que la animación haya terminado
              });
        }
    })

    // OBTENER LINK DE RESERVA
    $(".btn-copy-link").on("click",async function() {
        const inputBookingLink = $(".input-booking-link");
        try {
            const link = await makeRequest(BASE_URL+'admin/get/link/for/booking/'+id,'GET',null,{})
            if (!link.ok) throw new Error(link.error)
            inputBookingLink.val(link.urlForBooking)
        } catch (error) {
            inputBookingLink.val(error.message)
        }
      });
  
    
});
