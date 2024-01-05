$(document).ready(function() {

    $(".container-item").hide();
    $("#apartment-data").show();


    $('#btn-family-edit').click(function(event) {  
        event.preventDefault();

        if($("#img-save-family").hasClass("hide")){
            $("#img-edit-family").addClass("hide");
            $("#img-save-family").removeClass("hide");
            $("#input-family").removeAttr("disabled");
        }
        else{
            $("#img-save-family").addClass("hide");
            $("#img-edit-family").removeClass("hide");
            $("#input-family").attr("disabled", "disabled");
            //aqui se actualizaria en BD
        }
    });


    

});