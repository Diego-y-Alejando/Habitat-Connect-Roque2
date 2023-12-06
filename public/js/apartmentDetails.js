$(document).ready(function() {

    $(".container-item").hide();
    $("#apartment-data").show();
    $(".subitem-menu").click(function(event) {
        event.preventDefault();
        const target = $(this).data("target");
        $(".container-item").hide();
        $("#" + target).show();
        $(".subitem-menu").removeClass("selected-item");
        $(this).addClass("selected-item");
    });

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