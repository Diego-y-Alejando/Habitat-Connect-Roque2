const {request, response }= require('express');
const {
    validateName,
    bodyVerification,
    validationEmail,
    validatePhoneNumber,
    validationPassword,
    tokenValidation,
    ValidationIdOrLevel,
    validationOcupationState,
    recordExist
}= require('../middlewares/common.middlewares');

const apartaments = require('../models/apartaments.model')
const getApartamentsValidations=async(req=request , res = response, next)=>{
    const level = req.params.level
    try {
        ValidationIdOrLevel('nivel deseado',level)
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getApartamentDetailValidations = async(req = request , res = response, next)=>{

    try {
        ValidationIdOrLevel('id del apartamento',req.params.apartament_id);
        await recordExist('El apartamento solicitado no existe',apartaments,req.params.apartament_id)
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateLandlordDataValidations = async(req= request , res = response, next)=>{
    const apartament_id = req.params.apartament_id
    const {name, phone_number}= req.body
    try {
        validationLandlordData(req.body)
        await recordExist('El apartamento solicitado no existe',apartaments,req.params.apartament_id)
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateApartamentNameValidations = async(req= request , res = response, next)=>{
    const apartament_id = req.params.apartament_id
    const {apartament_name}= req.body
    try {
        validateName(apartament_name,60)
        await recordExist('El apartamento solicitado no existe',apartaments,req.params.apartament_id)
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports= {
    getApartamentsValidations,
    getApartamentDetailValidations,
    updateLandlordDataValidations,
    updateApartamentNameValidations,
    
}
// validaciones especificas de los parqueos


const validationLandlordData =(body)=>{
    const validationObject ={
        'name':(value)=>{
            validateName(value,55)
        },
        'phone_number':(value)=>{
            validatePhoneNumber(value)
        },
        'email':(value)=>{
            validationEmail(value)
        }
    }
    Object.keys(body).forEach(propertyName=>{
        if (validationObject.hasOwnProperty(propertyName)) {
            validationObject[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
}