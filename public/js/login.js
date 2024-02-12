
import{
    validationEmail,
    validationPassword,
}from "./validators.js"
import{
    BASE_URL
}from "./helpers.js"

$(document).ready(function() {

    $("#buttonLogin").click(function(event) {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        // try{
        //     $("#inputEmail").removeClass("error");
        //     $("#error-input-email").addClass("hide");
        //     $("#error-input-email").text("");
        //     validationEmail(email);
        // }catch(error){
        //     $("#inputEmail").addClass("error");
        //     $("#error-input-email").removeClass("hide");
        //     $("#error-input-email").text(error.message);
        // }
        
        // try{
        //     $("#input-password").removeClass("error");
        //     $("#error-input-password").addClass("hide");
        //     $("#error-input-password").text("");           
        //     validationPassword(password);
        // }catch(error){
        //     $("#input-password").addClass("error");
        //     $("#error-input-password").removeClass("hide");
        //     $("#error-input-password").text(error.message);
        // }

        
    });

    $("#loginForm").on("submit", function(event) {
        event.preventDefault();
        console.log("SUBMIT");
        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();
        $.ajax({
            url: BASE_URL + "admin/login",
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
                console.log("xhr", xhr.responseJSON.error);
                $("#input-email").addClass("error");
                $("#error-input-email").removeClass("hide");
                $("#error-input-email").text(xhr.responseJSON.error.toString());
                $("#input-password").addClass("error");
                $("#error-input-password").removeClass("hide");
                $("#error-input-password").text(xhr.responseJSON.error.toString());
            }
        });

    });

});
