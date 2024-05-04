const {response, request}= require('express')
const {
    bodyVerification,
    validateName,
    validateDpi,
    ValidationIdOrLevel,
    tokenValidation,
    userExist,
    validationVisitStatus,
    validatePage
} = require('../common.middlewares')
const apartament = require ('../../models/apartament.model.js');
const package_delivery = require('../../models/packageDelivery.model')
const security_user = require('../../models/securityUser.model')
const createPackageDeliveryValidations = async (req = request , res = response , next)=>{
    const {resident_name,company_name,apartament_id}=req.body
    const token = req.cookies.authorization

    try {
        bodyVerification(req.body,['resident_name','company_name','apartament_id']);
        validateName(resident_name,30);
        validateCompanyName(company_name);
        ValidationIdOrLevel('id del apartamento ',apartament_id);
        await userExist('El apartamento al que intentas registrar el paquete',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'id_features_apartament', 'ocupation_state']);
        const {id} = await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        req.id_creator=id
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const checkPackageDeliveryValidations = async (req = request , res = response , next)=>{
    const {delivery_id,delivery_status} = req.body
    const token = req.cookies.authorization
    try {
        ValidationIdOrLevel('id del paquete ',delivery_id);
        validationVisitStatus(delivery_status);
        await userExist('El paquete  que intenta marcar',package_delivery,delivery_id,'package_delivery_id',[ 'resident_name', 'company_name', 'delivery_time', 'package_delivery_state', 'id_package_recipient', 'id_delivery_creator', 'id_apartament_package' ]);
        const {id} = await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        req.id_receptor = id
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false,
         
        })
    }
}
const getPackageDeliveriesValidations = async (req = request , res = response , next)=>{
    const page = parseInt(req.query.page)
    const token = req.cookies.authorization
    try {
        validatePage(page);
        await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}

const searchPackageValidations =async(req = request , res = response, next)=>{
    const searchData = req.query.searchData
    const token = req.cookies.authorization
    try {
        await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const undoCheckPackageDeliveryValidations =async(req = request , res = response,next)=>{
    const {delivery_id,prevState}= req.body
    const token = req.cookies.authorization
    try{
        ValidationIdOrLevel('id del paquete',delivery_id);
        validationVisitStatus(prevState);
        await userExist('El paquete  que intenta marcar',package_delivery,delivery_id,'package_delivery_id',[ 'resident_name', 'company_name', 'delivery_time', 'package_delivery_state', 'id_package_recipient', 'id_delivery_creator', 'id_apartament_package' ]);
        await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        });
    }
}
module.exports = {
    createPackageDeliveryValidations,
    checkPackageDeliveryValidations,
    getPackageDeliveriesValidations,
    searchPackageValidations,
    undoCheckPackageDeliveryValidations
}
const validateCompanyName =(company_name)=>{
    const regexCompanyName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9. ]+$/
    if (!company_name) {
        throw new Error('El nombre de la empresa no puede venir vacío');
    }if (!regexCompanyName.test(company_name)) {
        throw new Error('El nombre de la empresa solo puede contener letras, números y puntos')
    }
}