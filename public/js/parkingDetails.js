$(document).ready(function() {
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

});