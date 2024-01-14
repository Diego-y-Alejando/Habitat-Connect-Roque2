import{validateName} from './validators.js'

$(document).ready(function() {

    $(".container-item").hide();
    $("#apartment-data").show();

    let familyName = "Familia";

    $("#input-family").val(familyName);


    $('#btn-family-edit').click(function(event) {  
        event.preventDefault();

        if($("#img-save-family").hasClass("hide")){
            $("#img-edit-family").addClass("hide");
            $("#img-save-family").removeClass("hide");
            $("#input-family").removeAttr("disabled");
        }
        else{

            const newFamilyName = $("#input-family").val();

            if(newFamilyName !== familyName){
                familyName = newFamilyName;
                try{
                    validateName(newFamilyName, 55);
                    $("#input-family").removeClass("error");
                    $("#error-input-family-name").addClass("hide");
                    $("#img-save-family").addClass("hide");
                    $("#input-family").attr("disabled", "disabled");
                    $("#img-edit-family").removeClass("hide");

                    //Aqui se hace el request
                }catch(error){
                    $("#input-family").addClass("error");
                    $("#error-input-family-name").removeClass("hide");
                    $("#error-input-family-name").text(error);
                    console.log(error);
                }
            }else{
                $("#img-save-family").addClass("hide");
                $("#input-family").attr("disabled", "disabled");
                $("#img-edit-family").removeClass("hide");
            }

            

        }
    });


    

});