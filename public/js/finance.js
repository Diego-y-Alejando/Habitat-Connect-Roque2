import {
    loadSuppliers
} from './Supplier.js';
import {
    loadRecordsForPay
} from './RecordForPay.js';


$(document).ready(function() {

    loadSuppliers();
    loadRecordsForPay();


    $(".container-item").hide();
    $("#suppliers").show();


    $(".supplier-name").click(function(event) {
        event.preventDefault();
        $("#edit-supplier").removeClass("hide");
        $("#edit-supplier").animate({
            opacity:1
        }),400;
        $("#input-name-supplier").attr('placeholder', $(this).text());
    });

    $(".record-supplier-name").click(function(event) {  
        event.preventDefault();
        $("#edit-record").removeClass("hide");
        $("#edit-record").animate({
            opacity:1
        }),400;
        $("#record-supplier").attr('placeholder', $(this).text());
    });

    $("#Return-suppliers").click(function(event) {
        event.preventDefault();
        $("#edit-supplier").animate({
            opacity:0
        },400, function() {
            $("#edit-supplier").addClass("hide");
        });
    });

    $("#Return-record").click(function(event) { 
        event.preventDefault();
        $("#edit-record").animate({
            opacity:0
        },400, function() {
            $("#edit-record").addClass("hide");
        });
    });

    $("#btn-edit-supplier").click(function(event) {
        event.preventDefault();
        if ($("#btn-save-supplier-img").hasClass("hide")) {
            $("#btn-save-supplier-img").removeClass("hide");
            $("#btn-edit-supplier-img").addClass("hide");
            $(".input-form").removeAttr("disabled");
        }else{
            $("#btn-save-supplier-img").addClass("hide");
            $("#btn-edit-supplier-img").removeClass("hide");
            $(".input-form").attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
    });

    $("#btn-edit-record").click(function(event) {
        event.preventDefault();
        if ($("#btn-save-record-img").hasClass("hide")) {
            $("#btn-save-record-img").removeClass("hide");
            $("#btn-edit-record-img").addClass("hide");
            $(".input-form").removeAttr("disabled");
        }else{
            $("#btn-save-record-img").addClass("hide");
            $("#btn-edit-record-img").removeClass("hide");
            $(".input-form").attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
    });

    $("#settings-icon").click(function(event) {
        event.preventDefault();
    
        if($("#filter-record-for-pay").hasClass("hide")){
            $("#filter-record-for-pay").
            removeClass("hide")
            .animate({
                height: "649px"
            },800);
        }else{
            $("#filter-record-for-pay").css({
                height: "649px"
            }).animate({
                height: "0px"
            },800, function() {
                $("#filter-record-for-pay").addClass("hide");
            });
        }
    });


});



