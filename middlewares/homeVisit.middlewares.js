const {response, request}= require('express')
const {
    bodyVerification,
    validateName,
    validateDpi,
    ValidationIdOrLevel,
    tokenValidation,
    recordExist,
    validationVisitStatus,
    validatePage,
    validationDates,
    checkIsAfterToday,
    validationQueryParams
} = require('./common.middlewares')
const {
    getCurrentDateAndTime
} = require('../helpers/helpers')
const home_visit = require('../models/homeVisit.model');
const {getHomeVisitService}= require('../services/homeVisit.services');
const createHomeVisitValidations = async (req = request , res = response , next)=>{
    const {resident_name,visitors_name,dpi,visit_date}= req.body
    try {
        bodyVerification(req.body,['resident_name','visitors_name','dpi','visit_date']);
        validateName(resident_name,30);
        validateName(visitors_name,30);
        validateDpi(dpi)
        validationDates(visit_date,'La fecha de la visita');
        checkIsAfterToday(visit_date,'La fecha de la visita no puede ser antes de hoy');
        next()
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const editHomeVisitValidations =async (req = request , res = response ,next)=>{
    const visit_id = req.params.visit_id
    try {
        ValidationIdOrLevel('id de la visita',visit_id);
        await recordExist('La visita que intenta editar no existe',home_visit,visit_id);
        editHomeVisit(req.body)
        next();
    }catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        });
    }
}
const checkHomeVisitValidations = async (req = request , res = response , next)=>{
    const {visit_id,visit_status} = req.body
    try {
        ValidationIdOrLevel('id de la visita',visit_id);
        validationVisitStatus(visit_status);
        await userExist('La visita que intentas marcar',home_visit,visit_id,'home_visit_id',[ 'resident_name', 'visitors_name', 'dpi', 'start_visit_time', 'end_visit_time', 'home_visit_state', 'id_visit_creator', 'id_apartament_visit']);
        // validacion del token y existencia del ususario de seguridad 
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const cancelOrUndoCancelValidations =async (req = request , res = response , next)=>{
    const visit_id = req.params.visit_id
    try {
        ValidationIdOrLevel('id de la visita',visit_id);
        await recordExist('La visita que intenta editar no existe',home_visit,visit_id);
        next()
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const getAllHomeVisitsValidations = async (req = request , res = response , next)=>{
    try {
        validationQueryParams(req.query)
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}

const undoCheckHomeVisitValidations = async (req = request , res = response , next)=>{
    const {visit_id,prevState}= req.body
    const token = req.cookies.authorization
    try {
        ValidationIdOrLevel('id del paquete',delivery_id);
        validationVisitStatus(prevState);
        await userExist('La visita que intentas deshacer',home_visit,visit_id,'home_visit_id',[ 'resident_name', 'visitors_name', 'dpi', 'start_visit_time', 'end_visit_time', 'home_visit_state', 'id_visit_creator', 'id_apartament_visit']);
        await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const getHomeVisitValidations =async (req = request , res = response, next)=>{
    const visit_id = req.params.visit_id
    try {
        ValidationIdOrLevel('id de la visita',visit_id)
        await recordExist('La visita que intenta editar no existe',home_visit,visit_id);
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports ={
    createHomeVisitValidations,
    checkHomeVisitValidations,
    getAllHomeVisitsValidations,
    undoCheckHomeVisitValidations,
    editHomeVisitValidations,
    cancelOrUndoCancelValidations,
    getHomeVisitValidations
}
const editHomeVisit =(body)=>{
    const homeVisitObjectValidations ={
        'visitors_name':(value)=>{
            validateName(value,30);
        },
        'dpi':(value)=>{
            validateDpi(value)
        },
        'visit_date':(value)=>{
            validationDates(value,'La fecha de la visita');
            checkIsAfterToday(value,'La fecha de la visita no puede ser antes de hoy');
        }
    }
    Object.keys(body).forEach(propertyName=>{
        if (homeVisitObjectValidations.hasOwnProperty(propertyName)) {
            homeVisitObjectValidations[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
}
