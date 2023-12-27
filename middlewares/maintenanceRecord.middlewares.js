const {request, response}=require('express');
const {
    bodyVerification,
    validationYear,
    ValidationIdOrLevel,
    tokenValidation,
    validationDates, 
    validationMonth,
    ValidationPaidStatus,
    userExist
}= require('../middlewares/common.middlewares');
const user = require('../models/user.model');
const apartament = require('../models/apartament.model')
const getMaintenanceApartamentValidations = async (req = request , res = response, next)=>{
    const token = req.headers.authorization
    const {apartament_id, current_year}= req.query
    try {
        validationYear(current_year);
        ValidationIdOrLevel('id del apartamento',apartament_id)
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateMaintenanceValidations= async (req = request , res = response, next)=>{
    const token = req.headers.authorization
    const apartament_id = req.params.apartament_id
    const {year,month,paid_status,date_paid}=req.body
    try {
        ValidationIdOrLevel('id del apartamento',apartament_id)
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        bodyVerification(req.body,['year','month','paid_status','date_paid']);
        validationYear(year);
        validationMonth(month);
        validationDates(date_paid,'Fecha de pago de mantenimiento')
        ValidationPaidStatus(paid_status);
        
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports={
    getMaintenanceApartamentValidations,
    updateMaintenanceValidations
}