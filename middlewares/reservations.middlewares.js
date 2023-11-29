const {request , response}= require('express');
const {
    validateName,
    validatePhoneNumber,
    validationDates,
    ValidationIdOrLevel,
    tokenValidation,
    userExist,
    validationHour,
    compareHours
} = require('./common.middlewares')
const reservations = require('../models/reservations.model');
const amenities = require('../models/amenities.model');
const apartament = require('../models/apartament.model')
const user = require('../models/user.model')
const getLinkForBookingValidations =async (req = request, res = response, next)=>{
    const token = req.headers.authorization
    const apartament_id= req.params.apartament_id
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('apartamento para el que solicitas el token',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const bookingAmenityValidations = async (req = request, res = response, next)=>{
    const token = req.headers.authorization
    const {
        reservation_date,
        start_reserv_time,
        end_reserv_time,
        renter_name,
        renter_phone,
        id_apartament_reservations,
        id_amenity_reserved
    } = req.body 
    try {
        await tokenValidation(token,apartament,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state'],process.env.SECRETKEYFORBOOKING,['user']);
        await userExist('apartamento que contiene el token',apartament,id_apartament_reservations,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        await userExist('ambiente que intentas reservar',amenities,id_amenity_reserved,'amenity_id',['amenity_name', 'rent_cost', 'additional_cost_per_hour']);
        validationDates(reservation_date,'fecha de reservación');
        validationHour(start_reserv_time,'inicio de reserva');
        validationHour(end_reserv_time,'cierre de reserva')
        validateName(renter_name,65)
        validatePhoneNumber(renter_phone)
        ValidationIdOrLevel('id del apartamento que reserva',id_apartament_reservations)
        ValidationIdOrLevel('id de la amenidad',id_amenity_reserved);

     








        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports={
    getLinkForBookingValidations,
    bookingAmenityValidations
    
}

const bookingVerifications = async(body)=>{
    const bookingDataValidations ={
        'reservation_date':(value)=>{
            validationDates(value,'fecha de reservación');
        }, 
        'start_reserv_time':(value)=>{
            validationHour(value,'inicio de reserva');
        },
        'end_reserv_time':(value)=>{
            validationHour(value,'cierre de reserva');
        }, 
        'renter_name':(value)=>{
            validateName(value,65)
        },
        'renter_phone':(value)=>{
            validatePhoneNumber(value)
        },
        'id_apartament_reservations':(value)=>{
            ValidationIdOrLevel('id del apartamento que reserva',value)
        },
        'id_amenity_reserved':(value)=>{
            ValidationIdOrLevel('id de la amenidad',value)
        }
    }
    Object.keys(body).forEach(propertyName=>{
        if (bookingDataValidations.hasOwnProperty(propertyName)) {
            bookingDataValidations[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    });
    compareHours(body.start_reserv_time, body.end_reserv_time,false,'No puedes reservar mas de 6 horas');
}