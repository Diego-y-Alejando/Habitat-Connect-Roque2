$(document).ready(function() {

    $(".supplier-name").click(function(event) {
        event.preventDefault();
        $("#edit-supplier").removeClass("hide");
        $("#edit-supplier").animate({
            opacity:1
        }),400;
        $("#input-name-supplier").attr('placeholder', $(this).text());
    });

    $(".record-supplier-name").click(function(event) {  
        event.preventDefault();
        $("#edit-record").removeClass("hide");
        $("#edit-record").animate({
            opacity:1
        }),400;
        $("#record-supplier").attr('placeholder', $(this).text());
    });

    $("#Return-suppliers").click(function(event) {
        event.preventDefault();
        $("#edit-supplier").animate({
            opacity:0
        },400, function() {
            $("#edit-supplier").addClass("hide");
        });
    });
    
    $("#btn-edit-supplier").click(function(event) {
        console.log('click');
        event.preventDefault();
        if ($("#btn-save-supplier-img").hasClass("hide")) {
            $("#btn-save-supplier-img").removeClass("hide");
            $("#btn-edit-supplier-img").addClass("hide");
            $(".input-form").removeAttr("disabled");
            $(".input-finance-forms").removeAttr("disabled");
        }else{
            $("#btn-save-supplier-img").addClass("hide");
            $("#btn-edit-supplier-img").removeClass("hide");
            $(".input-form").attr("disabled", "disabled");
            $(".input-finance-forms").attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
    });
});