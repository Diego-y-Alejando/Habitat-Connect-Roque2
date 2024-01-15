$(document).ready(function() {
    $("#btn-edit-record").click(function(event) {
        event.preventDefault();
        if ($("#btn-save-record-img").hasClass("hide")) {
            $("#btn-save-record-img").removeClass("hide");
            $("#btn-edit-record-img").addClass("hide");
            $(".input-form").removeAttr("disabled");
        }else{
            $("#btn-save-record-img").addClass("hide");
            $("#btn-edit-record-img").removeClass("hide");
            $(".input-form").attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
    });

    $("#filter-icon").click(function(event) {
        event.preventDefault();
    
        if($("#filter-record-for-pay").hasClass("hide")){
            $("#filter-record-for-pay").
            removeClass("hide")
            .animate({
                height: "649px"
            },400);
        }else{
            $("#filter-record-for-pay").css({
                height: "649px"
            }).animate({
                height: "0px"
            },400, function() {
                $("#filter-record-for-pay").addClass("hide");
            });
        }
    });

    $("#Return-record").click(function(event) { 
        event.preventDefault();
        $("#edit-record").animate({
            opacity:0
        },400, function() {
            $("#edit-record").addClass("hide");
        });
    });
    
});