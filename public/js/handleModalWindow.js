(function($, window, document) {    
    const  btnDisplayModalWIndow = $('.display-modal-window');
    const closeWindowBtn =$('.close-window')
    btnDisplayModalWIndow.each(function() {
        $(this).on('click', function(event) {
          const containerBookingFormAndCalendar=$(this).parent().siblings('.modal-window').length > 0 ?
          $(this).parent().siblings('.modal-window') 
          :
          $(this).parent().find('div#modal-window');

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
        $(this).on('click', function(event) {
            event.preventDefault();
            const closeContainer =$(this).closest('.modal-window');
            closeContainer.animate({
                opacity:0
            }, 400).css({
                display: 'none',
            });
        });
        
    });
}(window.jQuery, window, document));

