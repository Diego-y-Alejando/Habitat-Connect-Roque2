const {request , response}= require('express');
const {Op,Sequelize}=require('sequelize')

const {
    bodyVerification,
    validateName,
    validatePhoneNumber,
    validationDates,
    ValidationIdOrLevel,
    tokenValidation,
    userExist,
    validationHour,
    compareHours
} = require('./common.middlewares')
const {
    hourAdder,
    innerJoinChildToFatherTables
}= require('../helpers/helpers')
const reservations = require('../models/reservations.model');
const amenities = require('../models/amenities.model');
const apartament = require('../models/apartament.model')
const user = require('../models/user.model')
const getLinkForBookingValidations =async (req = request, res = response, next)=>{
    const token = req.cookies.authorization
    const apartament_id= req.params.apartament_id
    try {
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist(' El apartamento para el que solicitas el token',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
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
        bodyVerification(req.body,['reservation_date', 'start_reserv_time', 'end_reserv_time', 'renter_name', 'renter_phone', 'id_apartament_reservations', 'id_amenity_reserved'])
        validationDates(reservation_date,'fecha de reservación');
        validationHour(start_reserv_time,'inicio de reserva');
        validationHour(end_reserv_time,'cierre de reserva');
        compareHours(start_reserv_time,end_reserv_time,false,'No puedes reservar mas de 6 horas una amenidad ')
        validateName(renter_name,65);
        validatePhoneNumber(renter_phone)
        ValidationIdOrLevel('id del apartamento que reserva',id_apartament_reservations)
        ValidationIdOrLevel('id de la amenidad',id_amenity_reserved);
        // await tokenValidation(token,apartament,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state'],process.env.SECRETKEYFORBOOKING,['user']);
        const {start_time, end_time} =await userExist('La amenidad que intentas reservar',amenities,id_amenity_reserved,'amenity_id',['amenity_name', 'rent_cost', 'additional_cost_per_hour']);
        await verifyAviableTime(id_amenity_reserved,reservation_date,start_reserv_time,end_reserv_time)
        validationTime(start_time,start_reserv_time,true)
        validationTime(end_time,end_reserv_time,false)
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getMyBookingValidations = async(req = request , res = response, next)=>{
    const {reserv_id,apartament_id} = req.query
    try{
        ValidationIdOrLevel('id de tu reserva ',reserv_id)
        await userExist('El apartamento que reserva',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        await userExist('La reservacion que intentas recuperar',reservations,reserv_id,'reserv_id',[ 'reservation_date', 'start_reserv_time', 'end_reserv_time', 'renter_name', 'renter_phone', 'id_apartament_reservations', 'id_amenity_reserved']);
        next();
    }catch (error){
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const updateBookingValidations = async (req = request , res = response, next)=>{
    const {
        reserv_id,
        id_apartament_reservations,
        reservation_date,
        start_reserv_time,
        end_reserv_time,
        renter_name,
        renter_phone,
    } = req.body 
    try{
       
        updateBookingDataValidations(req.body)
        await userExist('El apartamento que reserva',apartament,id_apartament_reservations,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        const {dataValues,reservationHaveAmenity}= await innerJoinChildToFatherTables(reservations,amenities,'id_amenity_reserved','reservationHaveAmenity',reserv_id,'reserv_id',['reserv_id','id_amenity_reserved'],['start_time','end_time'],'No existe la reserva que deseas recuperar');
        // validaciones adicionales
        const hasDate = req.body['reservation_date']?true:false 
        if (hasDate){
            const {id_amenity_reserved}=dataValues    
            const {start_time, end_time} = reservationHaveAmenity.dataValues;
            compareHours(start_reserv_time,end_reserv_time,false,'No puedes reservar mas de 6 horas una amenidad ')
            await verifyAviableTime(id_amenity_reserved,reservation_date,start_reserv_time,end_reserv_time,reserv_id)
            await findTimeConflictWithOtherReservations(reserv_id,reservation_date,start_reserv_time,end_reserv_time);
            validationTime(start_time,start_reserv_time,true);
            validationTime(end_time,end_reserv_time,false);
        }   
        next()
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const cancelBookingValidations= async (req = request , res = response, next)=>{
    const reserv_id = req.params.reserv_id
    try {
        ValidationIdOrLevel('id de la reserva',reserv_id)
        await userExist('La reservación que intentas recuperar',reservations,reserv_id,'reserv_id',[ 'reservation_date', 'start_reserv_time', 'end_reserv_time', 'renter_name', 'renter_phone', 'id_apartament_reservations', 'id_amenity_reserved']);   
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getEventsOfAmenityValidationsUser = async (req = request , res = response, next)=>{
    const {amenity_id,date} = req.query 
    try {
        validationDates(date,'fecha del calendario')
        ValidationIdOrLevel('id de la amenidad',amenity_id);
        await userExist('La amenidad de la que intentas recuperar los eventos',amenities,amenity_id,'amenity_id',['amenity_name', 'rent_cost', 'additional_cost_per_hour']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getEventsOfAmenityValidationsAdmin =  async (req = request , res = response, next)=>{
    const {amenity_id,date} = req.query 
    const token = req.cookies.authorization
    try {
        validationDates(date,'fecha del calendario')
        ValidationIdOrLevel('id de la amenidad',amenity_id);
        // await tokenValidation(token,user,'user_id',['user_type', 'name', 'lastname', 'email', 'phone_number', 'dpi', 'password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('La amenidad del que intentas recuperar los eventos',amenities,amenity_id,'amenity_id',['amenity_name', 'rent_cost', 'additional_cost_per_hour']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
module.exports={
    getLinkForBookingValidations,
    bookingAmenityValidations,
    updateBookingValidations, 
    getMyBookingValidations ,
    cancelBookingValidations,
    getEventsOfAmenityValidationsUser,
    getEventsOfAmenityValidationsAdmin,
}
// me verifica que no haya excedido la cantidad de reservas en un dia 
const verifyAviableTime =async(amenity_id,date,start_reserv_time,end_reserv_time,reserv_id=0)=>{
    let hourDifference;
    let totalHoursPerReservation=[];
    try {
        const reservationsList = await reservations.findAll({
            where:{
                reserv_id:{ 
                    [Op.not]: reserv_id 
                },
                id_amenity_reserved:amenity_id,
                reservation_date:date,
                reserv_state:1
            },
            attributes:['start_reserv_time','end_reserv_time']
        })
        reservationsList.forEach((reservation) => {
            hourDifference= hourAdder(reservation.start_reserv_time,reservation.end_reserv_time);
            totalHoursPerReservation.push(hourDifference)
        });
        let  totalHours = totalHoursPerReservation.reduce((acumulador, hours) => acumulador + hours, 0);
        if (Math.ceil(totalHours)>=10 ) {
            throw new Error('Ya no hay espacio para mas reservas');
        }else if(totalHours<10){
            hourDifference=hourAdder(start_reserv_time,end_reserv_time);
            totalHoursPerReservation.push(hourDifference);
            totalHours = totalHoursPerReservation.reduce((acumulador, hours) => acumulador + hours, 0);
            if (Math.ceil(totalHours)>10 ) {
                throw new Error('Revisa los horarios ya no hay espacio para tu reserva');
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
// Valida que la el tiempo de una reserva ya sea el incial o el final  de dicha reserva no sea previo al
// el horario de apertura de una amenidad  o  posterior al cierre de la amenidad, el true o false me permite controlar esos estados  
const validationTime = (amenity_time,reserv_time,flag)=>{
    const [amenity_time_hour, amenity_time_minutes] = amenity_time.split(':').map(Number);
    const [reserv_time_hour,reserv_time_minutes] = reserv_time.split(':').map(Number);

    const amenity_time_ms = (amenity_time_hour * 60 + amenity_time_minutes) * 60 * 1000;
    const reserv_time_ms = (reserv_time_hour * 60 + reserv_time_minutes) * 60 * 1000;

    const difference = (amenity_time_ms - reserv_time_ms)/3600000;
    
    if(!flag) {
        if (Math.floor(difference)<0) {
            throw new Error(`La reserva no puede iniciar antes de las ${amenity_time}`)
        }
    }
    if(flag) {
        if (difference>0) {
            throw new Error(`La reserva no puede terminar despues  de las ${amenity_time}`)
        }
    }
}
const findTimeConflictWithOtherReservations=async(reserv_id,reservation_date,start_reserv_time,end_reserv_time)=>{
    try {
        const {dataValues} = await reservations.findOne({
            reserv_id:{ 
                [Op.not]: reserv_id 
            },
            start_reserv_time:{
                [Op.lte]: end_reserv_time
            },
            end_reserv_time:{
                [Op.gte]: start_reserv_time
            } 
        })
    
    } catch (error) {
        throw new Error(error)
    }
}
const updateBookingDataValidations =(body)=>{
    const updateValidationsObject ={
        'renter_name':(value)=>{
            validateName(value,55)
        },
        'renter_phone':(value)=>{
            validatePersonalPhone(value)
        },
        'reservation_date':(value)=>{
            validationDates(value,'fecha de reserva')
        },
        'start_reserv_time':(value)=>{
            validationHour(value,'Inicio de la reserva');

        },
        'end_reserv_time':(value)=>{
            validationHour(value,'Inicio de la reserva');
        },
        'id_apartament_reservations':(value)=>{
            ValidationIdOrLevel('id del apartamento que reserva',value);
        },
        'reserv_id':(value)=>{
            ValidationIdOrLevel('id de la reserva',value);
        }
    }
    Object.keys(body).forEach(propertyName=>{
        if (updateValidationsObject.hasOwnProperty(propertyName)) {
            updateValidationsObject[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
}
// FUNCION QUE ME AYUDA A RECUPERAR LOS HORARIOS DE LA AMENIDAD que se ha reservado a travez del id de la reservacion
//  y recuepera el id de la amenidad 

