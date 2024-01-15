$(document).ready(function() {

    let walkingStickers = 0;
    let numberOfWalkingStickers = 0;

    $("#btn-add-walking-info").click(function(event) {
        event.preventDefault();
        if($("#btn-add-walking-info").hasClass("enabled")){
            alert("NO");
        }else{
            walkingStickers = $("#input-walking-info").val();
            numberOfWalkingStickers++;
            addWalkingStickers(numberOfWalkingStickers , walkingStickers);
            $("#input-walking-info").val("");
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

        }
    });
});

function addWalkingStickers(numberOfWalkingStickers, walkingStickers){
    let span = $("<span></span>").text(walkingStickers);
    let p = $("<p></p>").addClass("info-row gray").text(`Sticker ${numberOfWalkingStickers}:`).append(span);
    $("#walking-stickers-container").append(p);
}