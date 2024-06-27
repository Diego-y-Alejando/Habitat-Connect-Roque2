const {request, response}= require('express');
const path = require('path')
const users = require('../models/users.model')
const amenities = require('../models/amenities.model');
const apartaments = require('../models/apartaments.model')
const {
    tokenValidation,
    recordExist,
    validationCost,
    validationHour,
    ValidationIdOrLevel,
}= require('./common.middlewares')
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const {
    getAmenityInfoService
} = require('../services/amenities.services');

const updateAmenityDataValidations = async(req = request , res = response , next)=>{

    const amenity_id = req.params.amenity_id
    try {
        if (Object.keys(req.body).length==0) {
            throw new Error('Debes enviar los datos para actualizar')
        }
        ValidationIdOrLevel('id de la amenidad',amenity_id)
        await recordExist('La amenidad que intenta editar no existe',amenities,amenity_id);
        const {start_time,end_time} = await getAmenityInfoService(amenity_id,['start_time','end_time'])
        updateAmenityDataValidationsBody(req.body,start_time,end_time)
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}

const ableAndDisabledAmenityValidations = async(req = request, res = response, next)=>{
    const amenity_id = req.params.amenity_id
    try {
        ValidationIdOrLevel('id de la amenidad',amenity_id)
        await recordExist('La amenidad que intenta deshabilitar no existe',amenities,amenity_id);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}

const getAmenityDetailValidations = async( req= request , res = response, next)=>{
    const amenity_id = req.params.amenity_id
    try {
        ValidationIdOrLevel('id de la amenidad',amenity_id)
        await recordExist('La amenidad que intenta obtener no existe',amenities,amenity_id);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
module.exports ={
    updateAmenityDataValidations,
    ableAndDisabledAmenityValidations,
    getAmenityDetailValidations,
}

const updateAmenityDataValidationsBody =(body,start_time,end_time)=>{
    const bodyValidations={
        'rent_cost':(value)=>{
            validationCost(value,'renta');
        },
        'start_time':(value)=>{
            validationHour(value,'inicio de reserva');
            
        },
        'end_time':(value)=>{
            validationHour(value,'cierre de reserva');
           
        },
        'free_hours':(value)=>{
            validateTotalHours(value,'La cantidad de horas gratis no tiene el formato correcto')
        },
        'time_limit':(value)=>{
            validateTotalHours(value,'El limite de horas no tiene el formato correcto');

        },
        'additional_cost_per_hour':(value)=>{
            validationCost(value,'adicional por hora');
        }
    }
    Object.keys(body).forEach(propertyName=>{
        if (bodyValidations.hasOwnProperty(propertyName)) {
            bodyValidations[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
    // if (body.start_time && body.end_time) {

    //     compareHours(body.start_time,body.end_time,true,'El horario de la amenidad debe tener almenos 10 horas de disponibilidad')     
    // }else if(body.start_time && !body.end_time){
    //     compareHours(body.start_time, end_time,true,'El horario de la amenidad debe tener almenos 10 horas de disponibilidad')
    // }else if(!body.start_time && body.end_time){
    //     compareHours(start_time,body.end_time,true,'El horario de la amenidad debe tener almenos 10 horas de disponibilidad')
    // }
    

}

const validateTotalHours =(numberOfHours, message)=>{
    const regexTotalHours = /^\d{1,2}(\.\d{1,1})?$/ 
    if (!regexTotalHours.test(numberOfHours)) {
        throw new Error(message)
    }
}