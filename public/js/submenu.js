$(document).ready(function() {

    const firstElement = $("#menu").find(".subitem-menu").first();
    const menuToggle = $("#menu-toggle");
    const menu = $("#sub-menu");
    const menuWidth = 250; 
    let menuOpen = false;


    $(".subitem-menu").click(function(event) {
        event.preventDefault();
        const target = $(this).data("target");
        $(".container-item").hide();
        $('.container-item').removeClass('content-active')
        $("#" + target).show().addClass('content-active');
        $(".subitem-menu").find(".selected-item-line").addClass("hide");
        $(this).find(".selected-item-line").removeClass("hide").attr('id','show');
    });

    
    if ($(window).width() < 1023) {
        menu.css("left", "-250px");
        menuOpen = false;
    }

    menuToggle.click(function () {
        if (menuOpen) {
            menu.animate({ left: -menuWidth }, 300);
            menuOpen = false;
        } else {
            menu.animate({ left: 0 }, 300); 
            menuOpen = true;
        }
    });

    $(window).resize(function () {
        if ($(window).width() < 1023) {
            menu.css("left", "-250px");
            menuOpen = false;
        }
    });

    $(window).resize(function () {
        if ($(window).width() > 1023) {
            menu.css("left", "0px");
            menuOpen = false;
        }
    });

    $(window).click(function (e) {
        if (menuOpen && e.target.id !== "menu-toggle" && e.target.id !== "menu") {
            menu.animate({ left: -menuWidth }, 300);
            menuOpen = false;
        }
    });


    menu.click(function (e) {
        e.stopPropagation();
    });
    menuToggle.click(function (e) {
        e.stopPropagation();
    });


});

