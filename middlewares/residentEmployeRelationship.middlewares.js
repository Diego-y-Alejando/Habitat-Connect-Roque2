const { request , response}=require('express');

const residents_employee = require('../models/residents_employee.model');
const resident_employee_relationships = require('../models/resident_employee_relationships.model')
const {
    recordExist,
    validatePhoneNumber, 
    ValidationIdOrLevel
}= require('../middlewares/common.middlewares');
const createRelationshipValidation= async(req = request , res = response , next)=>{
    const {boss_phone_number_1,boss_phone_number_2}= req.body
    const maid_id = req.params.maid_id
    try {
        if (!req.resident_id) throw new Error('No  viene el id del residente ')
        if (boss_phone_number_1===boss_phone_number_2) throw new Error('Los teléfonos de los encargados no pueden ser iguales')
        await recordExist('El empleado que solicitas', residents_employee,maid_id)
        validatePhoneNumber(boss_phone_number_1)
        if (boss_phone_number_2) {
            validatePhoneNumber(boss_phone_number_2)
        }
       
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getRelationshipDetailsValidation = async( req = request , res = response, next)=>{
    const maid_id = req.params.maid_id
    try{
        await recordExist('El empleado que solicitas no existe', residents_employee,maid_id);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateBossPhoneNumberValidation =async(req = request , res = response, next)=>{
    const maid_id = req.params.maid_id
    const {boss_phone_number_1,boss_phone_number_2}= req.body
    try {
        if (!req.resident_id) throw new Error('No  viene el id del residente ')
        ValidationIdOrLevel('id del empleado',maid_id)
        validationEditBossNumbers(req.body)
        await recordExist('El empleado que solicitas', residents_employee,maid_id)
        if (boss_phone_number_1===boss_phone_number_2) throw new Error('Los teléfonos de los encargados no pueden ser iguales')
        
        if (boss_phone_number_1) {
            const result = await resident_employee_relationships.findOne({
                where:{
                    boss_phone_number_1:boss_phone_number_1
                },
                attributes:['boss_phone_number_1']
            })

            if (result) {
                throw new Error('Ya existe este número como principal')
            }
        
        }
        
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const endRelationshipValidation = async (req = request, res = response)=>{
    try {  
        
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports={
    createRelationshipValidation,
    getRelationshipDetailsValidation,
    updateBossPhoneNumberValidation,
    endRelationshipValidation
}

const validationEditBossNumbers = (body)=>{
    const objectValidations ={
        'boss_phone_number_1' : async (value)=>{
            validatePhoneNumber(value);
            
        } ,
        'boss_phone_number_2':(value)=>{
            const regexPhone = /^(?:null|(?:\d{4}-\d{4}))$/;
            if (!regexPhone.test(value)) throw new Error('El numero de  teléfono  es inválido')
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