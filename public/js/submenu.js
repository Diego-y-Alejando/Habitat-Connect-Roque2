$(document).ready(function() {

    const firstElement = $("#menu").find(".subitem-menu").first();


    $(".subitem-menu").click(function(event) {
        event.preventDefault();
        const target = $(this).data("target");
        $(".container-item").hide();
        $("#" + target).show();

        $(".subitem-menu").find(".selected-item-line").addClass("hide");
        $(this).find(".selected-item-line").removeClass("hide");

    });

});

