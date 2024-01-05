
$(document).ready(function() {
    $("#btn-owner-edit").click(function(event) {    
        event.preventDefault();
    
        if($("#img-save-owner").hasClass("hide")){
            $("#img-edit-owner").addClass("hide");
            $("#img-save-owner").removeClass("hide");
            $("#input-owner-name").removeAttr("disabled");
            $("#input-owner-phone").removeAttr("disabled");
        }
        else{
            $("#img-save-owner").addClass("hide");
            $("#img-edit-owner").removeClass("hide");
            $("#input-owner-name").attr("disabled", "disabled");
            $("#input-owner-phone").attr("disabled", "disabled");
            //aqui se actualizaria en BD
        }
    });
    

    
});