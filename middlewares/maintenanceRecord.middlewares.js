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
    const token = req.cookies.authorization
    const {apartament_id, current_year}= req.query
    try {
        validationYear(current_year);
        ValidationIdOrLevel('id del apartamento',apartament_id)
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
// Calculo de mora
const isLateFee = (month, year, date_paid) => {
    const allowMonths = ['january', 'february', 'march', 'april', 'may', 'august', 'september', 'october', 'november', 'december'];
    const numberOfMonth = allowMonths.indexOf(month.toLowerCase()); // Convertir a minúsculas y obtener el índice
    const dateLimit = new Date(year, numberOfMonth, 6);
    const formatDatePaid = new Date(date_paid);

    const dayOfPay = (formatDatePaid - dateLimit) / (1000 * 60 * 60 * 24);
    console.log(dateLimit,formatDatePaid);
    // 1: impago, 2: pago moroso, 3: pago al día
    if (dayOfPay > 0) {
        return {
            msg: `Pago con mora de `,
            paid: 2
        };
    } else if (dayOfPay <= 0) {
        return {
            msg: 'Pago sin mora',
            paid: 3
        };
    }
};
const updateMaintenanceValidations= async (req = request , res = response, next)=>{
    const token = req.cookies.authorization
    const apartament_id = req.params.apartament_id
    const {year,month,date_paid}=req.body
    try {
        ValidationIdOrLevel('id del apartamento',apartament_id)
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        bodyVerification(req.body,['year','month','date_paid']);
        validationYear(year);
        validationMonth(month);
        validationDates(date_paid,'Fecha de pago de mantenimiento');
        const {msg,paid} =isLateFee(month,year,date_paid);
        req.msgLateFee=msg
        req.paid=paid
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
