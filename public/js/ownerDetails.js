import{validateName, validatePersonalPhone} from './validators.js'

$(document).ready(function() {

    let ownerName = "Propietario";
    let ownerPhone = "0000000000";

    $("#input-owner-name").val(ownerName);
    $("#input-owner-phone").val(ownerPhone);

    $("#btn-owner-edit").click(function(event) {    
        event.preventDefault();


    
        if($("#img-save-owner").hasClass("hide")){
            $("#img-edit-owner").addClass("hide");
            $("#img-save-owner").removeClass("hide");
            $("#input-owner-name").removeAttr("disabled");
            $("#input-owner-phone").removeAttr("disabled");
        }
        else{
            const newOwnerName = $("#input-owner-name").val();
            const newOwnerPhone = $("#input-owner-phone").val();

            if(newOwnerName !== ownerName || newOwnerPhone !== ownerPhone){
                ownerName = newOwnerName;
                ownerPhone = newOwnerPhone;
                //Try para verificar que el nombre sea valido
                try{
                    validateName(newOwnerName, 55);
                    $("#input-owner-name").removeClass("error");
                    $("#error-input-owner-name").addClass("hide");
                    $("#img-save-owner").addClass("hide");
                    $("#input-owner-name").attr("disabled", "disabled");
                    $("#img-edit-owner").removeClass("hide");

                    //Aqui se hace el request
                }catch(error){
                    $("#input-owner-name").addClass("error");
                    $("#error-input-owner-name").removeClass("hide");
                    $("#error-input-owner-name").text(error);
                    console.log(error);
                }

                //Try para verificar que el telefono sea valido
                try{
                    validatePersonalPhone(newOwnerPhone, 55);
                    $("#input-owner-phone").removeClass("error");
                    $("#error-input-owner-name").addClass("hide");
                    $("#img-save-owner").addClass("hide");
                    $("#input-owner-phone").attr("disabled", "disabled");
                    $("#img-edit-owner").removeClass("hide");

                    //Aqui se hace el request
                }catch(error){
                    $("#input-owner-phone").addClass("error");
                    $("#error-input-owner-phone").removeClass("hide");
                    $("#error-input-owner-phone").text(error);
                    console.log(error);
                }

            }else{
                $("#img-save-owner").addClass("hide");
                $("#input-owner-name").attr("disabled", "disabled");
                $("#img-edit-owner").removeClass("hide");
                $("#input-owner-phone").attr("disabled", "disabled");
                $("#img-edit-owner").removeClass("hide");
                
            }

            
        }
    });
    

    
});