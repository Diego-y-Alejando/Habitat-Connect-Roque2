$(document).ready(function() {
    loadSuppliers();
    loadRecordsForPay();

    const menuItems = $(".subitem-menu");
    const contenidoItems = $(".container-item");

    const inputs = $(".input-form");


    

    contenidoItems.hide();
    $("#suppliers").show();
    menuItems.click(function(event) {
        event.preventDefault();
        const target = $(this).data("target");
        contenidoItems.hide();
        $("#" + target).show();
        menuItems.removeClass("selected-item");
        $(this).addClass("selected-item");
    });

    $(".supplier-name").click(function(event) {
        event.preventDefault();
        $("#edit-supplier").removeClass("hide");
        $("#input-name-supplier").attr('placeholder', $(this).text());
    });

    $(".record-supplier-name").click(function(event) {  
        event.preventDefault();
        $("#edit-record").removeClass("hide");
        $("#record-supplier").attr('placeholder', $(this).text());
    });

    $("#Return-suppliers").click(function(event) {
        event.preventDefault();
        $("#edit-supplier").addClass("hide");
    });

    $("#Return-record").click(function(event) { 
        event.preventDefault();
        $("#edit-record").addClass("hide");
    });

    $("#btn-edit-supplier").click(function(event) {
        event.preventDefault();
        if ($("#btn-save-supplier-img").hasClass("hide")) {
            $("#btn-save-supplier-img").removeClass("hide");
            $("#btn-edit-supplier-img").addClass("hide");
            inputs.removeAttr("disabled");
        }else{
            $("#btn-save-supplier-img").addClass("hide");
            $("#btn-edit-supplier-img").removeClass("hide");
            inputs.attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
    });

    $("#btn-edit-record").click(function(event) {
        event.preventDefault();
        if ($("#btn-save-record-img").hasClass("hide")) {
            $("#btn-save-record-img").removeClass("hide");
            $("#btn-edit-record-img").addClass("hide");
            inputs.removeAttr("disabled");
        }else{
            $("#btn-save-record-img").addClass("hide");
            $("#btn-edit-record-img").removeClass("hide");
            inputs.attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
    });

    $("#settings-icon").click(function(event) {
        event.preventDefault();
        $("#filter-record-for-pay").toggleClass("hide");
        $("#filter-record-for-pay")
    });
});

function loadSuppliers() {
    /* $.ajax({
        url: "/supplier",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let suppliers = data.suppliers;
            let html = "";
            suppliers.forEach(supplier => {
                html += `<div class="supplier-name" data-phone="${supplier.phone}">${supplier.name}</div>`;
            });
            $(".suppliers-list").html(html);
        },
        error: function(error) {
            console.log(error);
        }
    });
    */

    let suppliers = [
        new Supplier("Juan Perez", "12345678", "Banco de Costa Rica", "Cuenta Corriente", "123456789", "Cheque", "Ninguna"),
        new Supplier("María Rodríguez", "98765432", "Banco Nacional", "Cuenta de Ahorro", "987654321", "Transferencia", "Contrato vigente"),
        new Supplier("Pedro Gómez", "55555555", "Banco Popular", "Cuenta Corriente", "555555555", "Cheque", "Servicio mensual"),
        new Supplier("Ana Sánchez", "33333333", "Banco BAC", "Cuenta de Ahorro", "333333333", "Transferencia", "Ninguna"),
        new Supplier("Carlos López", "77777777", "Banco Davivienda", "Cuenta Corriente", "777777777", "Cheque", "Mantenimiento trimestral"),
        new Supplier("Luisa Martínez", "99999999", "Banco HSBC", "Cuenta de Ahorro", "999999999", "Transferencia", "Contrato anual"),
        new Supplier("Miguel González", "11111111", "Banco Scotiabank", "Cuenta Corriente", "111111111", "Cheque", "Servicio mensual"),
        new Supplier("Elena Morales", "44444444", "Banco Citibank", "Cuenta de Ahorro", "444444444", "Transferencia", "Ninguna")
    ];

    const tableRow = $("<tr>").addClass("table-row");
    const supplierName = $("<td>").addClass("supplier-name");
    const supplierPhone = $("<td>");
    const supplierBank = $("<td>");
    const supplierAccount = $("<td>");
    const supplierAccountNumber = $("<td>");


    suppliers.forEach(supplier => {
        const newRow = tableRow.clone();

        const clonedSupplierName = supplierName.clone();
        const clonedSupplierPhone = supplierPhone.clone();
        const clonedSupplierAccountNumber = supplierAccountNumber.clone();
        const clonedSupplierBank = supplierBank.clone();
        const clonedSupplierAccount = supplierAccount.clone();
    
        clonedSupplierName.text(supplier.name).addClass("supplier-name");
        clonedSupplierPhone.text(supplier.phone);
        clonedSupplierAccountNumber.text(supplier.accountNumber);
        clonedSupplierBank.text(supplier.bank);
        clonedSupplierAccount.text(supplier.account);
    
        newRow.append(clonedSupplierName, clonedSupplierPhone, clonedSupplierAccountNumber, clonedSupplierBank, clonedSupplierAccount);
    
        $("#table-suppliers").append(newRow);
    });
    
}

function loadRecordsForPay() {
    /* $.ajax({
        url: "/supplier",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let suppliers = data.suppliers;
            let html = "";
            suppliers.forEach(supplier => {
                html += `<div class="supplier-name" data-phone="${supplier.phone}">${supplier.name}</div>`;
            });
            $(".suppliers-list").html(html);
        },
        error: function(error) {
            console.log(error);
        }
    }); */

    let recordsForPay = [
        new RecordForPay("Juan Perez", "12345678", "29-11-23", "Q230.00", true),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
    ];


    const tableRow = $("<tr>").addClass("table-row");
    const reocrdSupplier = $("<td>").addClass("record-supplier-name");
    const recordNumberBill = $("<td>");
    const recordDate = $("<td>");
    const recordPrice = $("<td>");
    const recordState = $("<td>");
    const recordCheckBox = $("<input>").attr("type", "checkbox");


    recordsForPay.forEach(record => {
        const newRow = tableRow.clone();

        const clonedReocrdSupplier = reocrdSupplier.clone();
        const clonedRecordNumberBill = recordNumberBill.clone();
        const clonedRecordDate = recordDate.clone();
        const clonedRecordPrice = recordPrice.clone();
        const clonedRecordState = recordState.clone();
        const clonedRecordCheckBox = recordCheckBox.clone();
    
        clonedReocrdSupplier.text(record.supplier);//.addClass("supplier-name");
        clonedRecordNumberBill.text(record.numberBill);
        clonedRecordDate.text(record.date);
        clonedRecordPrice.text(record.amount);
        
        if(record.isPayed){
            //clonedRecordState.text("Pagado");
            clonedRecordCheckBox.attr("checked", "checked");
        }else{
            //clonedRecordState.text("Pendiente");
            clonedRecordCheckBox.removeAttr("checked");
        }
        clonedRecordState.append(clonedRecordCheckBox);

        newRow.append(clonedReocrdSupplier, clonedRecordNumberBill, clonedRecordDate, clonedRecordPrice, clonedRecordState);
    
        $("#table-record-for-pay").append(newRow);
    });
}


class Supplier {
    constructor(name, phone, bank, account, accountNumber, paymentMethod, description) {
        this.name = name;
        this.phone = phone;
        this.bank = bank;
        this.account = account;
        this.accountNumber = accountNumber;
        this.paymentMethod = paymentMethod;
        this.description = description;
    }
}
class RecordForPay{
    constructor(supplier, numberBill ,date, amount, isPayed){
        this.supplier = supplier;
        this.numberBill = numberBill;
        this.date = date;
        this.amount = amount;
        this.isPayed = isPayed;
    }
}