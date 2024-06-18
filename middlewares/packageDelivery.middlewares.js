const {response, request}= require('express')
const {
    bodyVerification,
    validateName,
    validateDpi,
    ValidationIdOrLevel,
    recordExist,
    validationVisitStatus,
    validatePage,
    validationDates,
    checkIsAfterToday,
    validationQueryParams
} = require('./common.middlewares')

const package_delivery = require('../models/packageDelivery.model')
const security_users = require('../models/security_users.model')
const createPackageDeliveryValidations = async (req = request , res = response , next)=>{
    const {resident_name,company_name,delivery_date}=req.body
    const token = req.cookies.authorization

    try {
        bodyVerification(req.body,['resident_name','company_name','delivery_date']);
        validateName(resident_name,30);
        validateCompanyName(company_name);  
        validationDates(delivery_date,'El campo fecha de entrega'); 
        checkIsAfterToday(delivery_date,'No puedes programar un paquete para días anteriores') 
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
        validationPackageDeliveryStatus(delivery_status);
        await recordExist('El paquete  que intenta marcar',package_delivery,delivery_id,'package_delivery_id',[ 'resident_name', 'company_name', 'delivery_time', 'package_delivery_state', 'id_package_recipient', 'id_delivery_creator', 'id_apartament_package' ]);
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false,
         
        })
    }
}
const getAllPackageDeliveryValidations = async (req = request , res = response , next)=>{
    const page = parseInt(req.query.page)
    try {
        validationQueryParams(req.query);
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
    try {
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const undoCheckPackageDeliveryValidations =async(req = request , res = response,next)=>{
    const {visit_id,prevState}= req.body
    const token = req.cookies.authorization
    try{
        ValidationIdOrLevel('id del paquete',visit_id);
        validationPackageDeliveryStatus(prevState);
        await recordExist('El paquete  que intenta marcar',package_delivery,visit_id,'package_delivery_id',[ 'resident_name', 'company_name', 'delivery_time', 'package_delivery_state', 'id_package_recipient', 'id_delivery_creator', 'id_apartament_package' ]);
        await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        next();
    } catch (error) {
       
    }
}
const editPackageDeliveryValidations = async (req = request , res = response, next)=>{
    const visit_id = req.params.visit_id
    try {
        ValidationIdOrLevel('id del paquete',visit_id);
        await recordExist('El paquete que intentas editar no existe o es antiguo',package_delivery,visit_id);
        editPackageDelivery(req.body);
        // validar que el paquete este vigente para poder editarlo y que no este cancelado 
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        });
    }
}

const getPackageDeliveryInfoValidations =async (req= request , res = response , next)=>{
    const visit_id = req.params.visit_id
    try {
        ValidationIdOrLevel('id del paquete',visit_id);
        await recordExist('El paquete que intenta recuperar no existe o es antiguo',package_delivery,visit_id);
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        });
    }
}
const cancelOrUndoCancelPackageDeliveryValidations =async ( req = request , res = response , next)=>{
    const visit_id = req.params.visit_id
    try {
        ValidationIdOrLevel('id del paquete',visit_id);
        await recordExist('El paquete solicitado no existe o es antiguo',package_delivery,visit_id);
        next()
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
    getAllPackageDeliveryValidations,
    searchPackageValidations,
    undoCheckPackageDeliveryValidations,
    editPackageDeliveryValidations,
    getPackageDeliveryInfoValidations,
    cancelOrUndoCancelPackageDeliveryValidations
}
const validateCompanyName =(company_name)=>{
    const regexCompanyName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9. ]+$/
    if (!company_name) {
        throw new Error('El nombre de la empresa no puede venir vacío');
    }if (!regexCompanyName.test(company_name)) {
        throw new Error('El nombre de la empresa solo puede contener letras, números y puntos')
    }
}
const validationPackageDeliveryStatus =(visit_status)=>{
    const regexVisitStatus=/^[0-2]+$/
    if (!visit_status) {
        throw new Error('El estatus de la visita  no puede venir vacío')
    }
    if (!regexVisitStatus.test(visit_status)) {
      throw new Error('El estatus de la visita es inválida')
    }
}
const editPackageDelivery =(body)=>{
    const objectValidations ={
        'resident_name':(value)=>{
            validateName(value,30);
            
        },
        'company_name':(value)=>{
            validateCompanyName(value);  
        },
        'delivery_date':(value)=>{
            validationDates(value,'El campo fecha de entrega'); 
            checkIsAfterToday(value,'No puedes programar un paquete para días anteriores') 
        }
    }
    Object.keys(body).forEach(propertyName=>{
        if (objectValidations.hasOwnProperty(propertyName)) {
            objectValidations[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
}