import{
    BASE_URL,
    headers,
    makeRequest
} from './helpers.js'
$(document).ready(function() {

    $('#table-suppliers tbody').on('click','.provider_name',function(evet){
        console.log('clik');
        $("#edit-supplier").removeClass("hide");
        $("#edit-supplier").animate({
            opacity:1
        }),400;
        
        // trae los datos 
        const selectedRow = $(this).parent()
        const id_row = selectedRow.attr('id')
        const editSupplierInputs = $('#edit-suplier-form').find('input.providers-input');
        try {

            const remaingDataProvider =await makeRequest(`${BASE_URL}admin/data/provider/${id_row}`,'GET',null,{}) 
            if(!remaingDataProvider.ok){
                throw new Error(remaingDataProvider.error)
            }
            $('#edit-suplier-form').find('input#supplier_id').val(id_row)

            editSupplierInputs.each(function(index, element) {
                const inputName = $(this).attr('name')
                const fieldRow= selectedRow.find(`.${inputName}`);
                if (fieldRow.length>0) {
                        element.value=fieldRow.text()
                }else{
                    element.value = remaingDataProvider.provider[inputName]
                }
            });
        } catch (error) {
            console.log(error);
        }
    })

    $(".record-supplier-name").click(function(event) {  
        $("#edit-record").removeClass("hide");
        $("#edit-record").animate({
            opacity:1
        }),400;
        $("#record-supplier").attr('placeholder', $(this).text());
    });

    
    
    $("#btn-edit-supplier").click(function(event) {
        
        if ($("#icon-save-edit-supplier").hasClass("hide")) {
            $("#icon-save-edit-supplier").removeClass("hide");
            $("#btn-edit-supplier-img").addClass("hide");
            $(".input-form").removeAttr("disabled");
            $(".input-finance-forms").removeAttr("disabled");
        }else{
            $("#icon-save-edit-supplier").addClass("hide");
            $("#btn-edit-supplier-img").removeClass("hide");
            $(".input-form").attr("disabled", "disabled");
            $(".input-finance-forms").attr("disabled", "disabled");
            //AQUI SE ACTUALIZARIA EN BD
        }
    });
});