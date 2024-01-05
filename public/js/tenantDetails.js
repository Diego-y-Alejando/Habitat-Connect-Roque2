$(document).ready(function() {
    $("#btn-tenant-edit").click(function(event) {
        event.preventDefault();
    
        if($("#img-save-tenant").hasClass("hide")){
            $("#img-edit-tenant").addClass("hide");
            $("#img-save-tenant").removeClass("hide");
            $("#input-tenant-name").removeAttr("disabled");
            $("#input-tenant-phone").removeAttr("disabled");
        }
        else{
            $("#img-save-tenant").addClass("hide");
            $("#img-edit-tenant").removeClass("hide");
            $("#input-tenant-name").attr("disabled", "disabled");
            $("#input-tenant-phone").attr("disabled", "disabled");
            //aqui se actualizaria en BD
        }
    });
});