const {request , response} = require('express');
const { Op, Sequelize } = require("sequelize");
const amenities = require('../models/amenities.model');
const reservations = require('../models/reservations.model')
const {
    jwtGenerate,
    getStartAndEndOfMonth,
    changeObjectNames
}= require('../helpers/helpers');
const path = require('path');
const myBookinHTML = path.join(__dirname, '..','views','myBooking.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const getLinkForBooking = async (req = request , res = response)=>{
    const apartament_id = req.params.apartament_id
    try {
        const token = await jwtGenerate(apartament_id,'user',process.env.SECRETKEYFORBOOKING,'4h')
        
        return res.status(200).json({
            urlForBooking:`${process.env.BASE_URL}/user/amenities/for/booking/?token=${token}&apartament_id=${apartament_id}`,
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
            where:{
                id_amenity_reserved:id_amenity_reserved,
                reservation_date: reservation_date,
                start_reserv_time:{
                    [Op.lte]: end_reserv_time
                },
                end_reserv_time:{
                    [Op.gte]: start_reserv_time
                }
                // reserv_state:1     
            },
            defaults: {
            start_reserv_time:start_reserv_time,
            end_reserv_time:end_reserv_time,
            renter_name: renter_name,
            renter_phone: renter_phone,
            reserv_state:1,
            id_apartament_reservations: id_apartament_reservations,
            id_amenity_reserved: id_amenity_reserved
            }
        });
        if (created) {
            return res.status(200).json({
                msg:`Se ha registrado tu reservacion con éxito puedes ver tu reserva
                    <a href="${process.env.BASE_URL}/user/get/my/reservation/?reserv_id=${booking.reserv_id}&apartament_id=${id_apartament_reservations}"><b>Aqui</b></a>`, 
                ok:true
            })
        }else{
            throw new Error('El horario que has escogido no está disponible ')
        }
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const getMybooking = async(req = request , res = response)=>{
    const {reserv_id, apartament_id} = req.query
    try {
        const reservation = await reservations.findOne({
            where:{
                reserv_id:reserv_id,
                id_apartament_reservations:apartament_id,
                reserv_state:1          
            },
            attributes:['reservation_date', 'start_reserv_time', 'end_reserv_time', 'renter_name', 'renter_phone','id_amenity_reserved'],
            include: [
                {
                  model: amenities, // Modelo asociado (por ejemplo, PostModel)
                  as:'reservationHaveAmenity',
                  attributes: ['amenity_name','nickName'] ,// Columnas que deseas recuperar del modelo asociado
                  foreignKey: 'id_amenity_reserved'
                }
              ]
        });
        if(!reservation) throw new Error('No existe esta reserva')
        console.log('asd',reservation.get().reservationHaveAmenity.dataValues);
        return  res.render(myBookinHTML,{
           reservationData:reservation.get(),
           amenityData:reservation.get().reservationHaveAmenity.dataValues
        });
    } catch (error) {
        return  res.render(error404HTML,{
            error:error.message,
            ok:false
        });
    }
}
const updateBooking = async (req = request , res = response)=>{
    const {
        reserv_id,
        id_apartament_reservations,
        reservation_date,
        start_reserv_time,
        end_reserv_time,
        renter_name,
        renter_phone,
    } = req.body  
    try {
     
        const updatedBooking  = await reservations.update(
            req.body,
            {
            where:{
                reserv_id:reserv_id,
                id_apartament_reservations:id_apartament_reservations,
                reserv_state:1   
            },
        })
        
        if (updatedBooking>0) {
            if (req.body['reservation_date']) {

                return res.status(200).json({
                    msg:'Has actualizado tu reserva',
                    newBooking:{
                        id:reserv_id,
                        start:start_reserv_time,
                        end:end_reserv_time,
                        date:reservation_date
                    },
                    ok:true
                })  
            }else{
                return res.status(200).json({
                    msg:'Has actualizado tu reserserva',
                    ok:true
                })
            }
            
        }else{
            throw new Error('El horario que escogiste no está disponible')
        }
        
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const cancelBooking= async (req = request , res = response)=>{
    const reserv_id=req.params.reserv_id
    try {
        const cancelBooking = await reservations.update(
            {
                reserv_state:0
            },
            {
                where:{
                    reserv_id:reserv_id
                }
            }
        )
        if (cancelBooking) {
            return res.status(200).json({
                msg:'Has cancelado tu reserva',
                ok:true
            })
        }else{
            throw new Error('No se ha podido cancelar tu reserva')
        }
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getEventsOfAmenity = async (req = request , res = response)=>{
    const {amenity_id, date}= req.query
    try {

        const {start_month,end_month} =getStartAndEndOfMonth(date)
       
        const events = await reservations.findAll({
            where:{
                id_amenity_reserved:amenity_id,
                reservation_date:{
                    [Op.between]:[start_month,end_month]
                }
            },
            attributes:['reserv_id','reservation_date','start_reserv_time','end_reserv_time'],
            order: [['reservation_date', 'ASC']]
        })
        let newEvents=[]
        events.forEach(event => {
            const { dataValues } = event;
            const newObjectEvent=changeObjectNames(dataValues, {
                "reserv_id": "id",
                "reservation_date": "date",
                "start_reserv_time": "start",
                "end_reserv_time": "end"
            })
            newEvents.push(newObjectEvent)
          });
       
        console.log('estos son',newEvents);
        return res.status(200).json({
            events:newEvents,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
module.exports ={
    getLinkForBooking,
    bookingAmenity,
    updateBooking,
    getMybooking,
    cancelBooking,
    getEventsOfAmenity,
    
}