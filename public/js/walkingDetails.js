$(document).ready(function() {

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