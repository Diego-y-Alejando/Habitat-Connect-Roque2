
import{
    validationEmail,
    validationPassword,
}from "./validators.js"
import{
    BASE_URL
}from "./helpers.js"

$(document).ready(function() {

    $("#buttonon-login").click(function(event) {

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

        
    });

    $("#login-form").on("submit", function(event) {
        event.preventDefault();
        console.log("SUBMIT");
        const email = $("#input-email").val();
        const password = $("#input-password").val();


        $.ajax({
            url: BASE_URL + "admin/loggin",
            method: "POST",
            data: {
                email: email,
                password: password
            },
            success: function(response) {
                window.location.href = BASE_URL + "admin/apartamentos"; 
                console.log(response);
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.log(error);
            }
        });
    });

});
