$(document).ready(function () {
    const menuToggle = $("#menu-toggle");
    const menu = $("#menu");
    const menuWidth = 264; 
    let menuOpen = false;

    if ($(window).width() < 1023) {
        menu.css("left", "-264px");
        menuOpen = false;
    }

    menuToggle.click(function () {
        if (menuOpen) {
            menu.animate({ left: -menuWidth }, 300);
            menuOpen = false;
            menuToggle.find('#filter-icon').attr('src','/public/icons/filter-white-icon.png').css({
                                                                                            'width':'10%',
                                                                                            'marginTop':'0%',
                                                                                            'marginLeft':'0%'
                                                                                        })
        } else {
            menu.animate({ left: 0 }, 300); 
            menuOpen = true;
            menuToggle.find('#filter-icon').attr('src','/public/icons/cerrar.png').css({
                                                                                    'width':'7%',
                                                                                    'marginTop':'5%',
                                                                                    'marginLeft':'2%'
                                                                                })
        }
    });
    $(window).resize(function () {
        if ($(window).width() < 1023) {
            menu.css("left", "-264px");
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
            menuToggle.find('#filter-icon').attr('src','../icons/filter-white-icon.png').css({
                'width':'10%',
                'marginTop':'0%',
                'marginLeft':'0%'
            })
            menuToggle.find('#filter-icon').attr('src','/public/icons/filter-white-icon.png').css({
                'width':'10%',
                'marginTop':'0%',
                'marginLeft':'0%'
            })
        }
    });


    menu.click(function (e) {
        e.stopPropagation();
    });
    menuToggle.click(function (e) {
        e.stopPropagation();
    });

});