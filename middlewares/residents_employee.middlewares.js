const {request , response }= require('express')
const {
    bodyVerification,
    validateName,
    validateLastName,
    validateDpi,
    validatePhoneNumber,
    validationEmail,
    validationPassword,
    ValidationIdOrLevel,
    recordExist,
    validationOccupationValue,
    validatePage
}= require('../middlewares/common.middlewares');
const residents_employee = require('../models/residents_employee.model')
const createEmployeeForResidentsValidations =(req = request , res = response, next)=>{
    const {name, lastname,dpi,phone_number,occupation_list}= req.body
    try {
        bodyVerification(req.body,['name', 'lastname','dpi','phone_number','occupation_list']);
        validateName(name,55)
        validateLastName(lastname)
        validateDpi(dpi)
        validatePhoneNumber(phone_number);
        validateOcupationArr(occupation_list);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getResidentsEmployeesValidations =(req = request , res = response , next)=>{
    const page = req.query.page
    try {
        validatePage(page);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getResidentEmployeeDetailValidations =async(req = request, res = response , next)=>{
    const maid_id = req.params.maid_id
    try {
        ValidationIdOrLevel('El id del empleado',maid_id);
        await recordExist('El empleado ',residents_employee,maid_id);
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports ={
    createEmployeeForResidentsValidations,
    getResidentsEmployeesValidations,
    getResidentEmployeeDetailValidations
}
const validateOcupationArr =(occupation_list)=>{
    if (!Array.isArray(occupation_list)) {
        throw new Error('La lista de ocupaciones no es válido')
    }
    occupation_list.forEach(occupation => {
        validationOccupationValue(occupation)
    });
}