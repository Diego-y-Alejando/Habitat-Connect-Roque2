$(document).ready(function () {
    const menuToggle = $("#menu-toggle");
    const menu = $("#menu");
    const menuWidth = 250; 
    let menuOpen = false;
    let startX = 0;
    let endX = 0;

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

    $("body").click(function (e) {
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