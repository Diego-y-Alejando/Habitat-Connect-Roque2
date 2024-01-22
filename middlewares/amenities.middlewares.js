const {request, response}= require('express');
const path = require('path')
const user = require('../models/user.model')
const amenities = require('../models/amenities.model');
const apartament = require('../models/apartament.model')
const {
    tokenValidation,
    userExist,
    validationCost,
    validationHour,
    compareHours
}= require('./common.middlewares')
const error404HTML = path.join(__dirname, '..','views','404.ejs');

const getAmenitiesValidations = async(req = request , res = response , next)=>{
    const token = req.cookies.authorization
    try {
        const {user_type }= await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        req.user_type='admin';
        next()
    } catch (error) {
        return  res.render(error404HTML,{
            error:error.message,
            ok:false
        });
    }
}
const updateAmenityDataValidations = async(req = request , res = response , next)=>{
    const token = req.cookies.authorization
    const amenity_id = req.params.amenity_id
    try {
        if (Object.keys(req.body).length==0) {
            throw new Error('Debes enviar los datos para actualizar')
        }
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        const {start_time,end_time} = await userExist('El id de la amenidad que solicita',amenities,amenity_id,'amenity_id',[ 'amenity_name', 'rent_cost', 'additional_cost_per_hour']);
        updateAmenityDataValidationsBody(req.body,start_time,end_time)
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getAmenitiesForBookingValidations = async (req = request , res = response , next )=>{
    const {token,apartament_id} = req.query

    try {
        const {user_type }=await tokenValidation(token,apartament,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state'],process.env.SECRETKEYFORBOOKING,['user']);
        await userExist('El número de apartamento que tiene el token',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        req.user_type='user';
        next();
        req.user_type=user_type;
    } catch (error) {
        return res.render(error404HTML,{
            error:error.message,
            ok:false
        })
    }
}

module.exports ={
    getAmenitiesValidations,
    updateAmenityDataValidations,
    getAmenitiesForBookingValidations,
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
    if (body.start_time && body.end_time) {

        compareHours(body.start_time,body.end_time,true,'El horario de la amenidad debe tener almenos 10 horas de disponibilidad')     
    }else if(body.start_time && !body.end_time){
        compareHours(body.start_time, end_time,true,'El horario de la amenidad debe tener almenos 10 horas de disponibilidad')
    }else if(!body.start_time && body.end_time){
        compareHours(start_time,body.end_time,true,'El horario de la amenidad debe tener almenos 10 horas de disponibilidad')
    }
    

}