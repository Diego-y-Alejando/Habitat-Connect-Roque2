$(document).ready(function(){
   
    const suplierTableContainer =$('#suppliers')
    const accountsPayable =$('#record-for-pay');

    suplierTableContainer.scroll(async function(event){
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            // hacer la peticion 
          }
    })
    accountsPayable.scroll(async function(event){
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            // hacer la peticion
            console.log('cargar elemento')
          }
    })
});
   
















