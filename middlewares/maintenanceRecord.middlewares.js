const {request, response}=require('express');
const {
    validationYear,
    ValidationIdOrLevel,
    tokenValidation, 
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
const updateMaintenanceValidations= async (req = request , res = response)=>{
    try {
        
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