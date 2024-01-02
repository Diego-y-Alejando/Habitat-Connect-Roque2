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

});



