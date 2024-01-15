$(document).ready(function() {
    let year = new Date().getFullYear();
    //0: no info
    //1: impago
    //2: pago moroso
    //3: pago al dia
    const maintanceInfo = [];

    $(".calendar-nav-title").text(year);

    $("#calendar-go-next").click(function() {
        year++;
        $(".calendar-nav-title").text(year);
    });
    
    $("#calendar-go-back").click(function() {
        year--;
        $(".calendar-nav-title").text(year);
    });
});



