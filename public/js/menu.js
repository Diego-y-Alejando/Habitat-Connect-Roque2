$(document).ready(function () {
    // Obtén el botón del menú hamburguesa y la barra de navegación
    const menuToggle = $("#menu-toggle");
    const menu = $("#menu");

    // Define el ancho del menú (ajústalo según tu diseño)
    const menuWidth = 250; // Puedes cambiar este valor

    // Variable para rastrear si el menú está abierto o cerrado
    let menuOpen = false;

    // Agrega un evento de clic al botón del menú hamburguesa
    menuToggle.click(function () {
        if (menuOpen) {
            // Cierra el menú (desliza hacia la izquierda)
            menu.animate({ left: -menuWidth }, 300); // 300ms para la animación
            menuOpen = false;
        } else {
            // Abre el menú (desliza desde la izquierda)
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
        }
    });
});