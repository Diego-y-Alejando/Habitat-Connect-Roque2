const {request , response}= require('express')
const resident_employee_schedule = require('../models/resident_employee_schedule.model');
const resident_employee_relationships = require('../models/resident_employee_relationships.model')
const {
    recordExist,
    ValidationIdOrLevel,
    bodyVerification
}= require('../middlewares/common.middlewares');
const createScheduleValidation = async (req = request , res = response, next)=>{
    const {relationship_id,days_list,month_list}= req.body
    try {
        bodyVerification(req.body,['relationship_id','days_list','month_list'])
        ValidationIdOrLevel('id de la relacion',relationship_id)
        await recordExist('La relacion que enviaste no existe', resident_employee_relationships,relationship_id)
        checkDayListValues(days_list);
        checkMonthListValues(month_list);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getScheduleValidation = async (req = request , res = response, next)=>{
    const relationship_id = req.params.relationship_id
    try {
        ValidationIdOrLevel('id de la relacion',relationship_id)
        await recordExist('La relacion que enviaste no existe', resident_employee_relationships,relationship_id)
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const editScheduleValidation = async (req = request , res = response, next)=>{
    const relationship_id = req.params.relationship_id
    try {
        ValidationIdOrLevel('id de la relacion',relationship_id)
        await recordExist('La relacion que enviaste no existe', resident_employee_relationships,relationship_id)
        ValidationsEditSchedule(req.body)
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports={
    createScheduleValidation,
    getScheduleValidation,
    editScheduleValidation,
}
const checkDayListValues =(days_list)=>{
const regexDaysList = /^[1-7]$/
    if (!Array.isArray(days_list)) {
        throw  new Error('La lista de días debe ser un arreglo');
    }
    days_list.forEach(day => {
        if (!regexDaysList.test(day)) {
            throw new Error ('El arreglo de días contiene valores inválidos');
        }
    });
}
const checkMonthListValues =(month_list)=>{
const regexMonthList = /^([1-9]|1[0-2])?$/
    if (!Array.isArray(month_list)) {
        throw  new Error('La lista de meses debe ser un arreglo');
    }
    month_list.forEach(month => {
        if (!regexMonthList.test(month)) {
            throw new Error ('El arreglo de meses contiene valores inválidos');
        }
    });
}
const ValidationsEditSchedule =(body)=>{
    const  objectValidations ={
        'days_list':(value)=>{
            checkDayListValues(value)
        },
        'month_list':(value)=>{
            checkMonthListValues(value)
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