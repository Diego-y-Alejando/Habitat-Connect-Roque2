$(document).ready(function() {
   
    $('#btn-edit-record').click(function(event) {
        event.preventDefault();
        $("#btn-edit-record-img").attr('src', '/public/icons/save_icon.png').addClass('save-edit-account-payable');
        $('#edit-account-payable-form').find('.account-payable-input').prop('disabled',false);
    });
    $("#btn_filter").click(function(event) {
        event.preventDefault();
        if($("#filter-record-for-pay").hasClass("hide")){
            $("#filter-record-for-pay").
            removeClass("hide")
            .animate({
                height: "649px"
            },400);
        }else{
            $("#filter-record-for-pay").css({
                height: "649px"
            }).animate({
                height: "0px"
            },400, function() {
                $("#filter-record-for-pay").addClass("hide");
            });
        }
    });

    
});