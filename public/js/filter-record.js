$(document).ready(function(){
    
    $("#btn-filter").click(function(event) {
        event.preventDefault();
        $("#form-filter-record").toggleClass("hide");
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