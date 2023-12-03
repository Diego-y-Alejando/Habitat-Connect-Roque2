$(document).ready(function() {
    loadSuppliers();
    
    const menuItems = $(".subitem-menu");
    const contenidoItems = $(".container-item");
    const supplierName = $(".supplier-name");
    const suplierScreen = $(".finance-cart-backbround");
    const returnSuppliers = $("#Return-suppliers");
    const supplierInputName = $("#input-name-supplier");
    const supplierInputPhone = $("#input-phone-supplier");
    const supplierInputBank = $("#input-bank-supplier");
    const supplierInputAccount = $("#input-account-supplier");
    const supplierInputAccountNumer = $("#input-type-account-supplier");
    const supplierInputPaymentMethod = $("#input-payment-method-supplier");
    const supplierInputDescription = $("#input-description-supplier");
    const inputs = $(".input-form");
    const btnEdit = $("#btn-edit-supplier");
    const imageBtnEdit = $("#btn-edit-supplier-img");
    const imageBtnSave = $("#btn-save-supplier-img");
    

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

    supplierName.click(function(event) {
        event.preventDefault();
        suplierScreen.removeClass("hide");
        supplierInputName.attr('placeholder', $(this).text());
    });

    returnSuppliers.click(function(event) {
        event.preventDefault();
        suplierScreen.addClass("hide");
    });

    btnEdit.click(function(event) {
        event.preventDefault();
        if (imageBtnSave.hasClass("hide")) {
            imageBtnSave.removeClass("hide");
            imageBtnEdit.addClass("hide");
            inputs.removeAttr("disabled");
        }else{
            imageBtnSave.addClass("hide");
            imageBtnEdit.removeClass("hide");
            inputs.attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
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

        // Clona las celdas para cada proveedor
        const clonedSupplierName = supplierName.clone();
        const clonedSupplierPhone = supplierPhone.clone();
        const clonedSupplierAccountNumber = supplierAccountNumber.clone();
        const clonedSupplierBank = supplierBank.clone();
        const clonedSupplierAccount = supplierAccount.clone();
    
        // Establece el texto y las clases para cada celda
        clonedSupplierName.text(supplier.name).addClass("supplier-name");
        clonedSupplierPhone.text(supplier.phone);
        clonedSupplierAccountNumber.text(supplier.accountNumber);
        clonedSupplierBank.text(supplier.bank);
        clonedSupplierAccount.text(supplier.account);
    
        // Adjunta las celdas a la fila clonada
        newRow.append(clonedSupplierName, clonedSupplierPhone, clonedSupplierAccountNumber, clonedSupplierBank, clonedSupplierAccount);
    
        // Agrega la fila clonada (con todas las celdas) a la tabla
        $(".table-content").append(newRow);
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