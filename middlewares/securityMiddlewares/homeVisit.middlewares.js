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

const home_visit = require('../../models/homeVisit.model');
const apartament = require('../../models/apartament.model');
const security_user= require('../../models/securityUser.model')
const createHomeVisitValidations = async (req = request , res = response , next)=>{
    const {apartament_id,resident_name,visitors_name,dpi}= req.body
    const token = req.cookies.authorization
    try {
        bodyVerification(req.body,['apartament_id','resident_name','visitors_name','dpi']);
        ValidationIdOrLevel('id del apartamento',apartament_id);
        validateName(resident_name,30);
        validateName(visitors_name,30);
        validateDpi(dpi)
        await userExist('El apartamento al que intentas registrar la visita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'id_features_apartament', 'ocupation_state']);
        const {id} = await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
        req.id_creator = id
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
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
const getHomeVisitsValidations = async (req = request , res = response , next)=>{
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
const searchHomeVisitsValidations = async (req = request , res = response , next)=>{
    const token = req.cookies.authorization
    const searchData = req.query.searchData
    const page = req.query.page 
    try {
        validatePage(page)
        await tokenValidation(token,security_user,'security_user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['security']);
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

module.exports ={
    createHomeVisitValidations,
    checkHomeVisitValidations,
    getHomeVisitsValidations,
    searchHomeVisitsValidations,
    undoCheckHomeVisitValidations
}