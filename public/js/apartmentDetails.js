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

    $("#btn-add-parking-stikers").click(function(event) {
        event.preventDefault();
        if($("#btn-add-parking-stikers").hasClass("enabled")){
            alert("NO");
        }else{
            alert("SI");
        }
        
    });

    $("#btn-add-parking-slot").click(function(event) {
        event.preventDefault();
        if($("#btn-add-parking-slot").hasClass("enabled")){
            alert("NO");
        }else{
            alert("SI");
        }
    });

    

    $("#btn-edit-parking-info").click(function(event) {
        event.preventDefault();

        if($("#img-save-parking-info").hasClass("hide")){
            $("#img-edit-parking-info").addClass("hide");
            $("#img-save-parking-info").removeClass("hide");
            $("#input-parking-stickers").removeAttr("disabled");
            $("#input-parking-slot").removeAttr("disabled");
            $("#btn-add-parking-stikers").removeClass("enabled");
            $("#btn-add-parking-slot").removeClass("enabled");
        }
        else{
            $("#img-save-parking-info").addClass("hide");
            $("#img-edit-parking-info").removeClass("hide");
            $("#input-parking-stickers").attr("disabled", "disabled");
            $("#input-parking-slot").attr("disabled", "disabled");
            $("#btn-add-parking-stikers").addClass("enabled");
            $("#btn-add-parking-slot").addClass("enabled");
            //aqui se actualizaria en BD
        }
    });

    $("#btn-add-walking-info").click(function(event) {
        event.preventDefault();
        if($("#btn-add-walking-info").hasClass("enabled")){
            alert("NO");
        }else{
            alert("SI");
        }
    });

    $("#btn-edit-walking-info").click(function(event) {
        event.preventDefault();

        if($("#img-save-walking-info").hasClass("hide")){
            $("#img-edit-walking-info").addClass("hide");
            $("#img-save-walking-info").removeClass("hide");
            $("#input-walking-info").removeAttr("disabled");
            $("#btn-add-walking-info").removeClass("enabled");
        }
        else{
            $("#img-save-walking-info").addClass("hide");
            $("#img-edit-walking-info").removeClass("hide");
            $("#input-walking-info").attr("disabled", "disabled");
            $("#btn-add-walking-info").addClass("enabled");
            //aqui se actualizaria en BD
        }
    });

});