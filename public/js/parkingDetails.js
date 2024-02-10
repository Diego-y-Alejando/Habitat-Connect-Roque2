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
    const btnEditParkingData = $('#btn-edit-parking-info');
    const elementsDisable = $('.enabled');
    const btnDisabled = $('.btn-disabled-parking');
    const inputsDisabled = $('.parking-input');
    const addParkingStickerBtn = $('#img-add-parking-stickers');
    const parkingStickerContainer = $('#parking-stikers-container');
    const inputParkingStickers = $('#input-parking-stickers');
    const btnRemoveSticker = $('.remove-sticker');

    btnEditParkingData.on('click','#img-edit-parking-info',function(event) {
        event.preventDefault();
        $(this).attr('src', '/public/icons/save_icon.png').addClass('save-parking-data').removeAttr('id')
        btnDisabled.removeAttr('disabled').removeClass('enabled');
        inputsDisabled.removeAttr('disabled');
        $(inputsDisabled[0]).attr('placeholder', 'Identificador de sticker');
        $(inputsDisabled[1]).attr('placeholder', 'Número de parqueo');
        $(inputsDisabled[2]).attr('placeholder', 'Nivel del parqueo');
        btnRemoveSticker.css({
            'opacity': 1
        });
    });

    let parkingStickers = {};
    let errorsParkingStickers = {};

    inputParkingStickers.on('change', function(event) {
        const { name, value } = event.target;
        try {
            errorsParkingStickers[name] ? delete errorsParkingStickers[name] : errorsParkingStickers = {};
            ValidationStickerValues(value);
            parkingStickers = {
                ...parkingStickers,
                [name]: value
            };
        } catch (error) {
            errorsParkingStickers = {
                ...errorsParkingStickers,
                [name]: error.message
            };
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            });
        }
    });

    addParkingStickerBtn.click(function(event) {
        try {
            if (Object.keys(errorsParkingStickers).length > 0) throw new Error('Corrige el identificador del sticker');
            if (Object.keys(parkingStickers).length == 0) throw new Error('Ingresa un valor para un sticker');
            const lastStickerIndex = parkingStickerContainer.children().last().attr('data-sticker-index');
            const numberOfParkingStickers = parseInt(lastStickerIndex) + 1;
            addParkingStickersToStickersList(numberOfParkingStickers, parkingStickers.sticker);
            // updateParkingStickersObject();
            inputParkingStickers.val('');
        } catch (error) {
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            });
        }
    });

    parkingStickerContainer.on('click', '.remove-sticker', function(event) {
        $(this).parent().remove();
        // Actualizar el objeto parkingStickers después de quitar un sticker
        updateParkingStickersObject();
    });

    function addParkingStickersToStickersList(numberOfParkingStickers, parkingStickers) {
        let span = $("<span class='sticker-value'></span>").text(parkingStickers);
        let p = $(`<p class="info-row gray" data-sticker-index="${numberOfParkingStickers}"></p>`).addClass("info-row gray").text(`sticker_${numberOfParkingStickers}:`).append(span).append('<button class="btn-add-item bold  remove-sticker" style="color:red; cursor:pointer;">Borrar</button>');
        $("#parking-stikers-container").append(p);
       
    }

    function updateParkingStickersObject() {
        parkingStickers = {};
        parkingStickerContainer.children('.info-row').each(function() {
            const stickerIndex = $(this).attr('data-sticker-index');
            const stickerValue = $(this).find('.sticker-value').text();
            parkingStickers[`sticker_${stickerIndex}`] = stickerValue;
        });
        return parkingStickers
    }

    /*============================
        Funcionalidad de añadir espacios de parqueo
    =============================*/
    const parkingSpacesContainer =$('#parking-spaces-container')
    const parkingSpacesInput =$('.parking-spaces')
    const addParkingSlot =$('#img-add-parking-slot');
    let parkingSpacesAndLevel =[]
    let errorsParkingSpacesAndLevel ={}
    parkingSpacesInput.on('change',function(event){
        const { name, value } = event.target;
        try {
            errorsParkingStickers[name] ? delete errorsParkingStickers[name] : errorsParkingStickers = {};
            name =='parking-number'? validationParkingSpacesValues(value): validationParkingLevel(value)
            parkingSpacesAndLevel.push(value);
        } catch (error) {
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            }); 
        }
    })
    addParkingSlot.click(function(event){
        try {
            if (Object.keys(errorsParkingSpacesAndLevel).length > 0) throw new Error('Corrige el número de parqueo o el nivel');
            if (parkingSpacesAndLevel.length <2) throw new Error('Debes de rellenar Ambos campos ');
            addParkigSlot(parkingSpacesAndLevel[0],parkingSpacesAndLevel[1])
            parkingSpacesAndLevel=[]
            parkingSpacesInput.val('')
            // updateParkingSlotArr()

        } catch (error) {
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            }); 
        }
    })
    function updateParkingSlotArr (){

        parkingSpacesAndLevel=[]
        let space,joinPakingLevel
        parkingSpacesContainer.children('.info-row').each(function() {
            const arrayString = $(this).text().split(' ')
            space = arrayString[0]
            joinPakingLevel = `${arrayString[1]} ${arrayString[2]}`
            parkingSpacesAndLevel.push(space,joinPakingLevel)
        });
         
         return parkingSpacesAndLevel
    }
    const validationParkingSpacesValues =(parkingSpace)=>{
        const regexParkingSpaces = /^[1-9]{1,2}$/
    
        if (!parkingSpace) {
            throw new Error('No rellenaste los espacios de parqueos')
        }else if(!regexParkingSpaces.test(parkingSpace.trim())){
            throw new Error('Los espacios de parqueo contiene caracteres no válidos')
        }
       
    }
    const validationParkingLevel =(parkingLevel)=>{
        const regexParkingSpaces = /^primer nivel|segundo nivel|tercer nivel$/
        if (!parkingLevel) {
            throw new Error('El nivel del parqueo no debe venir vacío')
        }else if(!regexParkingSpaces.test(parkingLevel.trim())){
            throw new Error('El formato del nivel debe ser como este :primer nivel')
        }
     
    }
    const addParkigSlot =(parkingSpace,parkingLevel)=>{
        const parkingSlotItem =`<p class="info-row gray">${parkingSpace.trim()} <span class='parking_level'>${parkingLevel}</span></p>` 
        parkingSpacesContainer.append(parkingSlotItem)
    }
    /*===============
    ENVIO DE LOS DATOS 
    ================*/
    $('#btn-edit-parking-info').on('click','.save-parking-data',async function(event){
        event.preventDefault()
        console.log(event);
        try {
            const currentUrl = window.location.href;
            const apartamentoIdMatch = currentUrl.match(/\/apartamento\/(\d+)/);
            const id = apartamentoIdMatch[1];
            let updateParkingData={}
            if (Object.keys(parkingStickers).length>0 || parkingSpacesAndLevel.length>0) {
                const allParkingStickers = updateParkingStickersObject()
                const allParkingSlots = updateParkingSlotArr()
                updateParkingData={
                    parking_cards:{...allParkingStickers},
                    parking_spaces:allParkingSlots
                }
               const requestUpdateData = await makeRequest(BASE_URL+'admin/update/data/parking/'+id,'POST', updateParkingData,{})
                if (!requestUpdateData.ok) throw new Error(requestUpdateData.error)
                $('#modal-result').text(requestUpdateData.msg).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                    $('#modal-result').text('');
                    $(this).removeClass('save-parking-data').attr('src','/public/icons/editar-texto.png').attr('id','img-edit-parking-info');
                }); 
            }else{
                $(this).removeClass('save-parking-data').attr('src','/public/icons/editar-texto.png').attr('id','img-edit-parking-info');
            }
            
            btnDisabled.addClass('enabled')
            btnDisabled.prop('disabled',true)
            inputsDisabled.prop('disabled',true);
            $(inputsDisabled[0]).attr('placeholder', '');
            $(inputsDisabled[1]).attr('placeholder', '');
            $(inputsDisabled[2]).attr('placeholder', '');
            $('.remove-sticker').css({
                'opacity': 0
            });
        } catch (error) {
            $('#modal-result').text(error.message).addClass('modal-result').fadeIn(2000).delay(2000).fadeOut(2000).promise().done(function() {
                $('#modal-result').text('');
            }); 
        }
    })
});