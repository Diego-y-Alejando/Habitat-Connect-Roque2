(function($, window, document) {    
    const  bookinBtn = $('.booking-btn');
    const closeWindowBtn =$('.close-window')
    bookinBtn.each(function() {
        $(this).on('click', function() {
          const containerBookingFormAndCalendar=$(this).parent().siblings('.container-booking-form-calendar')
          containerBookingFormAndCalendar.css({
            display: 'flex',
          }).animate({
                opacity:1
            }, 400, function() {
                console.log('Animación completada');
            });
        });
    });
    closeWindowBtn.each(function() {
        $(this).on('click', function() {
           const closeContainer =$(this).closest('.container-booking-form-calendar');
           closeContainer.animate({
                opacity:0
            }, 400).css({
                display: 'none',
            });
        });
    });




}(window.jQuery, window, document));

