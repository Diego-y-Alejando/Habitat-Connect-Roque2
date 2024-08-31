const {request , response}= require('express');
const {Op,Sequelize}=require('sequelize')

const {
    bodyVerification,
    validateName,
    validatePhoneNumber,
    validationDates,
    ValidationIdOrLevel,
    tokenValidation,
    recordExist,
    validationHour,
    compareHours,
    checkIsAfterToday,
    validatePage
} = require('./common.middlewares')
const {
    hourAdder,
    calculatorNumnberOfMinutesBeetwenTwoHours
}= require('../helpers/helpers')
const reservations = require('../models/reservations.model');
const amenities = require('../models/amenities.model');
const users = require('../models/users.model')
const {
    getAmenityDataForBookingValidations
}= require('../services/amenities.services')

const bookingAmenityValidations = async (req = request, res = response, next)=>{
    const token = req.headers.authorization
    const {
        reservation_date,
        start_reserv_time,
        end_reserv_time,
        renter_name,
        renter_phone,
        id_amenity_reserved
    } = req.body 
    try {
        bodyVerification(req.body,['reservation_date', 'start_reserv_time', 'end_reserv_time', 'renter_name', 'renter_phone', 'id_amenity_reserved'])
        validationDates(reservation_date,'fecha de reservación');
        checkIsAfterToday(reservation_date,'No se puede realizar una reserva antes de hoy')
        validationHour(start_reserv_time,'inicio de reserva');
        validationHour(end_reserv_time,'cierre de reserva');
        validateName(renter_name,65);
        validatePhoneNumber(renter_phone);
        ValidationIdOrLevel('id de la amenidad',id_amenity_reserved);
        await recordExist('La amenidad que intentas reservar no existe',amenities,id_amenity_reserved);
        validationIfStartBookingTimeIsAfterBookingEndTime(start_reserv_time,end_reserv_time);
        const {free_hours,time_limit,start_time,end_time,rent_cost, is_disabled}= await getAmenityDataForBookingValidations(id_amenity_reserved);
        if (is_disabled===0) throw new Error('La amenidad se encuentra deshabilitada')
        validationIfBookingStartTimeIsAfterAmenityOpennig(start_reserv_time,start_time);
        validationIfBookingEndTimeIsBeforeClosingTime(end_reserv_time,end_time);
        validationIfTotalBookingHoursDoesNotExceedTheAllolHours(start_reserv_time,end_reserv_time,time_limit);
        
        const totalBookingHours = (calculatorNumnberOfMinutesBeetwenTwoHours(start_reserv_time, end_reserv_time) / 60).toFixed(2);
        const booking_price = calculatorBookingPrice(free_hours,rent_cost,totalBookingHours);
        req.body={
            ...req.body,
            'booking_price':booking_price,
            'total_hours':totalBookingHours,
            'id_resident_reserv':req.resident_id
        }
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getMyBookingValidations = async(req = request , res = response, next)=>{
    const reserv_id = req.params.reserv_id
    try{
        ValidationIdOrLevel('id de tu reserva ',reserv_id)
        await recordExist('La reserva que intentas recuperar no existe',reservations,reserv_id);
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
        reservation_date,
        start_reserv_time,
        end_reserv_time,
        renter_name,
        renter_phone,
        id_amenity_reserved
    } = req.body 
    try{
       
        updateBookingDataValidations(req.body)
        await recordExist('La reserva que intentas editar no existe',reservations,reserv_id);
        const hasDate = req.body['reservation_date']?true:false 
        if (hasDate){
            checkIsAfterToday(reservation_date,'No se puede realizar una reserva antes de hoy')
            validationIfStartBookingTimeIsAfterBookingEndTime(start_reserv_time,end_reserv_time);
            await findTimeConflictWithOtherReservations(reserv_id,reservation_date,start_reserv_time,end_reserv_time);
            const {free_hours,time_limit,start_time,end_time,rent_cost,is_disabled}= await getAmenityDataForBookingValidations(id_amenity_reserved);
            
            if (is_disabled==0) throw new Error('La amenidad se encuentra deshabilitada')
            
            validationIfBookingStartTimeIsAfterAmenityOpennig(start_reserv_time,start_time);
            validationIfBookingEndTimeIsBeforeClosingTime(end_reserv_time,end_time);
            validationIfTotalBookingHoursDoesNotExceedTheAllolHours(start_reserv_time,end_reserv_time,time_limit);

            const totalBookingHours = (calculatorNumnberOfMinutesBeetwenTwoHours(start_reserv_time, end_reserv_time) / 60).toFixed(2);
            const booking_price = calculatorBookingPrice(free_hours,rent_cost,totalBookingHours);
            req.body={
                ...req.body,
                'booking_price':booking_price,
                'total_hours':totalBookingHours,
            }  
        }   
        next();
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
        await recordExist('La reserva que intentas editar no existe',reservations,reserv_id);
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getEventsOfAmenityValidations = async (req = request , res = response, next)=>{
    const {amenity_id,date} = req.query 
    try {
        validationDates(date,'fecha del calendario')
        ValidationIdOrLevel('id de la amenidad',amenity_id);
        await recordExist('La amenidad ',amenities,amenity_id);
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getMyBookingListValidations =async(req = request , res = response, next)=>{
    const page = req.query.page
    try {
        validatePage(page);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}

module.exports={
    bookingAmenityValidations,
    updateBookingValidations, 
    getMyBookingValidations ,
    cancelBookingValidations,
    getMyBookingListValidations,
    getEventsOfAmenityValidations
    
}

const findTimeConflictWithOtherReservations=async(reserv_id,reservation_date,start_reserv_time,end_reserv_time)=>{
    try {
        const result = await reservations.findOne({
            where:{
                reserv_state:'1',
                reservation_date:{
                    [Op.eq]:reservation_date
                },
                reserv_id:{ 
                    [Op.not]: reserv_id 
                },
                start_reserv_time:{
                    [Op.lte]: end_reserv_time
                },
                end_reserv_time:{
                    [Op.gte]: start_reserv_time
                }
            }
           
        })
        if (result) {
            throw new Error('El horario que seleccionaste esta ocupado')
        }
    
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
            validatePhoneNumber(value)
        },
        'reservation_date':(value)=>{
            validationDates(value,'fecha de reserva')
        },
        'start_reserv_time':(value)=>{
            validationHour(value,'Inicio de la reserva');

        },
        'end_reserv_time':(value)=>{
            validationHour(value,'Final de la reserva');
        },
        'reserv_id':(value)=>{
            ValidationIdOrLevel('id de la reserva',value);
        },
        'id_amenity_reserved':(value)=>{
            ValidationIdOrLevel('id de la amenidad',value);
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

const validationIfBookingStartTimeIsAfterAmenityOpennig= (booking_start_time,amenity_opening_time)=>{

    const difference= calculatorNumnberOfMinutesBeetwenTwoHours(amenity_opening_time,booking_start_time)
    
    if (difference<0) {
        throw new Error('La hora de inicio de tu reserva no coincide con el horario de apertura de la amenidad');
    }
    
}
const validationIfBookingEndTimeIsBeforeClosingTime =(booking_end_time,amenity_closing_time)=>{
    const  difference = calculatorNumnberOfMinutesBeetwenTwoHours(amenity_closing_time,booking_end_time);
   
    if (difference>0) {
        throw new Error('La hora de finalización de reserva no coincide con el horario de cierre de la amenidad');

    }
}
const validationIfStartBookingTimeIsAfterBookingEndTime =(booking_start_time,booking_end_time)=>{
    const difference= calculatorNumnberOfMinutesBeetwenTwoHours(booking_start_time,booking_end_time);

    if (difference<0) {
        throw new Error('La reserva no puede inicar despues del la hora de finalización')
    }
}

const validationIfTotalBookingHoursDoesNotExceedTheAllolHours =(booking_start_time,booking_end_time, time_limit)=>{
    const totalBookingMinutes = calculatorNumnberOfMinutesBeetwenTwoHours(booking_start_time,booking_end_time);
    if ((time_limit*60)<totalBookingMinutes) {
        throw new Error(`La reserva no puede tener mas de ${time_limit} hora(s)`)
    }

}
const calculatorBookingPrice =(free_hours,rent_cost,totalBookingHours)=>{
    if (free_hours>=totalBookingHours) {
        return 0.00
    }else if (free_hours<totalBookingHours){
        return  (rent_cost * totalBookingHours).toFixed(2)
    }
}

