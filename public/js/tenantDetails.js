import{validateName, validatePersonalPhone} from './validators.js'
$(document).ready(function() {

    let tenantName = "Inquilino";
    let tenantPhone = "0000000000";

    $("#input-tenant-name").val(tenantName);
    $("#input-tenant-phone").val(tenantPhone);

    $("#btn-tenant-edit").click(function(event) {
        event.preventDefault();

        if($("#img-save-tenant").hasClass("hide")){
            $("#img-edit-tenant").addClass("hide");
            $("#img-save-tenant").removeClass("hide");
            $("#input-tenant-name").removeAttr("disabled");
            $("#input-tenant-phone").removeAttr("disabled");
        }
        else{
            const newTenantName = $("#input-tenant-name").val();
            const newTenantPhone = $("#input-tenant-phone").val();

            if(newTenantName !== tenantName || newTenantPhone !== tenantPhone){
                tenantName = newTenantName;
                try{
                    validateName(newTenantName, 55);
                    $("#input-tenant-name").removeClass("error");
                    $("#error-input-tenant-name").addClass("hide");
                    $("#img-save-tenant").addClass("hide");
                    $("#input-tenant-name").attr("disabled", "disabled");
                    $("#img-edit-tenant").removeClass("hide");
                    //Aqui se hace el request
                }catch(error){
                    $("#input-tenant-name").addClass("error");
                    $("#error-input-tenant-name").removeClass("hide");
                    $("#error-input-tenant-name").text(error);
                    console.log(error);
                }
                try{
                    validatePersonalPhone(newTenantPhone, 55);
                    $("#input-tenant-phone").removeClass("error");
                    $("#error-input-tenant-phone").addClass("hide");
                    $("#img-save-tenant").addClass("hide");
                    $("#input-tenant-phone").attr("disabled", "disabled");
                    $("#img-edit-tenant").removeClass("hide");
                    //Aqui se hace el request
                }catch(error){
                    $("#input-tenant-phone").addClass("error");
                    $("#error-input-tenant-phone").removeClass("hide");
                    $("#error-input-tenant-phone").text(error);
                    console.log(error);
                }
            }else{
                $("#img-save-tenant").addClass("hide");
                $("#input-tenant-name").attr("disabled", "disabled");
                $("#input-tenant-phone").attr("disabled", "disabled");
                $("#img-edit-tenant").removeClass("hide");
            }

        }
    });
});