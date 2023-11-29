$(document).ready(function() {
    const menuItems = $(".subitem-menu");
    const contenidoItems = $(".container-item");
    contenidoItems.hide();
    $("#apartment-data").show();
    menuItems.click(function(event) {
        event.preventDefault();
        const target = $(this).data("target");
        contenidoItems.hide();
        $("#" + target).show();
        menuItems.removeClass("selected-item");
        $(this).addClass("selected-item");
    });
});