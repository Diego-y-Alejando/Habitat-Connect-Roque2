
import{
    validationEmail,
    validationPassword,
}from "./validators.js"

$(document).ready(function() {

    $("#buttonon-login").click(function(event) {
        event.preventDefault();

        const email = $("#input-email").val();
        const password = $("#input-password").val();

        try{
            $("#input-email").removeClass("error");
            $("#error-input-email").addClass("hide");
            $("#error-input-email").text("");
            validationEmail(email);
        }catch(error){
            $("#input-email").addClass("error");
            $("#error-input-email").removeClass("hide");
            $("#error-input-email").text(error.message);
            console.log(error.message);
        }
        
        try{
            $("#input-password").removeClass("error");
            $("#error-input-password").addClass("hide");
            $("#error-input-password").text("");           
            validationPassword(password);
        }catch(error){
            $("#input-password").addClass("error");
            $("#error-input-password").removeClass("hide");
            $("#error-input-password").text(error.message);
            console.log(error.message);
        }

    /*  try{
            $.ajax({
                type: "POST",
                url: "/AQUI VA EL END POINT",
                data: {
                    email: password,
                    password: password
                },
                success: function(response){
    
                },
                error: function(error){
                    
                }
            });
        } catch (error) {
            console.error("Error en la solicitud AJAX: " + error.message);
            $("#mensaje").text("Se produjo un error en la solicitud. Por favor, inténtalo más tarde.");
        } */

        
    });

});
