import{
    ValidationStickerValues
} from './validators.js'
import{
    BASE_URL,
    headers,
    makeRequest,
    defaultMaintenanceMonth
} from './helpers.js'
$(document).ready(function() {
    const btnEditPedestrianData = $('#btn-edit-pedestrian-info');
    const btnDisabled = $('.btn-disabled-pedestrian');
    const inputPedestrianSticker = $('.input-pedestrian-data')
    const btnRemoveSticker = $('.remove-pedestrian-sticker');
    const addPedestrianSticker =$('#add-pedestrian-sticker')
    const pedestrianStickersContainer =$('#pedestrian-stickers-container')

    btnEditPedestrianData.on('click','#img-edit-walking-info',function(event) {
        event.preventDefault();
        $(this).attr('src', '/public/icons/save_icon.png').addClass('save-pedestrian-data').removeAttr('id')
        btnDisabled.prop('disabled',false).removeClass('enabled')
        inputPedestrianSticker.removeAttr('disabled');
        inputPedestrianSticker.attr('placeholder','Sticker de entrada peatonal')
        btnRemoveSticker.css({
            'opacity': 1
        });
    });


    let pedestrianStickers = {};
    let errorsPedestrianStickers = {};

    inputPedestrianSticker.on('change', function(event) {
        const { name, value } = event.target;
        try {
            errorsPedestrianStickers[name] ? delete errorsPedestrianStickers[name] : errorsPedestrianStickers = {};
            ValidationStickerValues(value);
            pedestrianStickers = {
                ...pedestrianStickers,
                [name]: value
            };
        } catch (error) {
            errorsPedestrianStickers = {
                ...errorsPedestrianStickers,
                [name]: error.message
            };
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            });
        }
    });
    
    addPedestrianSticker.click(function(event) {
        try {
            if (Object.keys(errorsPedestrianStickers).length > 0) throw new Error('Corrige el identificador del sticker');
            if (Object.keys(pedestrianStickers).length == 0) throw new Error('Ingresa un valor para un sticker');
            const lastStickerIndex = pedestrianStickersContainer.children().last().attr('data-sticker-index');
            const numberOfParkingStickers = parseInt(lastStickerIndex) + 1;
            console.log(numberOfParkingStickers);        
            addWalkingStickers(numberOfParkingStickers, pedestrianStickers.pedestrian_sticker);
            inputPedestrianSticker.val('');
        } catch (error) {
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            });
        }
    });
    pedestrianStickersContainer.on('click', '.remove-pedestrian-sticker', function(event) {
        $(this).parent().remove();
        // Actualizar el objeto pedestrianStickers después de quitar un sticker
        updatePedestrianStickers();
    });
    function updatePedestrianStickers() {
        pedestrianStickers = {};
        pedestrianStickersContainer.children('.info-row').each(function() {
            const stickerIndex = $(this).attr('data-sticker-index');
            const stickerValue = $(this).find('.sticker-value').text();
            pedestrianStickers[`sticker_${stickerIndex}`] = stickerValue;
        });
        return pedestrianStickers
    }
    function addWalkingStickers(numberOfWalkingStickers, walkingStickers){
        let span = $("<span class='sticker-value'></span>").text(walkingStickers);
        let p = $(`<p class="info-row gray "data-sticker-index="${numberOfWalkingStickers}"></p>`).text(`sticker_${numberOfWalkingStickers}:`).append(span).append('<button class="btn-add-item bold  remove-pedestrian-sticker" style="color:red; cursor:pointer;">Borrar</button>');
        $("#pedestrian-stickers-container").append(p);
    }
    $('#btn-edit-pedestrian-info').on('click','.save-pedestrian-data',async function(event){
        event.preventDefault()
        console.log('click en save');
        try {
            const currentUrl = window.location.href;
            const apartamentoIdMatch = currentUrl.match(/\/apartamento\/(\d+)/);
            const id = apartamentoIdMatch[1];
            let updatePedestrianData={}
            if (Object.keys(pedestrianStickers).length>0) {
                const allPedestrianStickers = updatePedestrianStickers()
                updatePedestrianData={
                    ...allPedestrianStickers
                }
               const requestUpdateData = await makeRequest(BASE_URL+'admin/update/data/pedestrian/'+id,'POST', updatePedestrianData,{})
                if (!requestUpdateData.ok) throw new Error(requestUpdateData.error)
                $('#modal-result').text(requestUpdateData.msg).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                    $('#modal-result').text('');
                    $(this).removeClass('save-pedestrian-data').attr('src','/public/icons/editar-texto.png').attr('id','img-edit-parking-info');

                }); 
            }else{
                $(this).removeClass('save-pedestrian-data').attr('src','/public/icons/editar-texto.png').attr('id','img-edit-walking-info');
            }
                btnDisabled.addClass('enabled')
                btnDisabled.prop('disabled',true)
                inputPedestrianSticker.prop('disabled',true);
                $(inputPedestrianSticker).attr('placeholder', '');
                $('.remove-pedestrian-sticker').css({
                    'opacity': 0
                });

        } catch (error) {
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            }); 
        }
    })
});
