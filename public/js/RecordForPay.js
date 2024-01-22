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
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false),
        new RecordForPay("María Rodríguez", "98765432", "29-10-23", "Q2250.00", true),
        new RecordForPay("Pedro Gómez", "55555555", "29-12-23", "Q1530.00", false)
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



class RecordForPay{
    constructor(supplier, numberBill ,date, amount, isPayed){
        this.supplier = supplier;
        this.numberBill = numberBill;
        this.date = date;
        this.amount = amount;
        this.isPayed = isPayed;
    }
}

export{
    loadRecordsForPay
}