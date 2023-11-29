const {request , response} = require('express');
const { Op } = require("sequelize");
const amenities = require('../models/amenities.model');
const reservations = require('../models/reservations.model')
const {
    jwtGenerate
}= require('../helpers/helpers');
const getLinkForBooking = async (req = request , res = response)=>{
    const apartament_id = req.params.apartament_id
    try {
        const token = await jwtGenerate(apartament_id,'user',process.env.SECRETKEYFORBOOKING)
        return res.status(200).json({
            urlForBooking:`${process.env.BASE_URL}/admin/amenities/for/booking/?token=${token}&apartament_id=${apartament_id}`,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const bookingAmenity = async (req = request , res = response)=>{
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
       
        const [booking, created] = await reservations.findOrCreate({
            where: {
            reservation_date: reservation_date,
            [Op.and]: [
                {
                start_reserv_time: {
                    [Op.between]: [start_reserv_time, end_reserv_time]
                }
                },
                {
                end_reserv_time: {
                    [Op.between]: [start_reserv_time, end_reserv_time]
                }
                }
            ]
            },
            defaults: {
            start_reserv_time:start_reserv_time,
            end_reserv_time:end_reserv_time,
            renter_name: renter_name,
            renter_phone: renter_phone,
            id_apartament_reservations: id_apartament_reservations,
            id_amenity_reserved: id_amenity_reserved
            }
        });
        if (created) {
            return res.status(200).json({
                msg:'Se ha registrado tu reservacion con éxito',
                ok:false
            })
        }else{
            throw new Error('No sd ha podido completar tu reservacion comprueba que esten disponibles las horas que deseas')
        }
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports ={
    getLinkForBooking,
    bookingAmenity
}