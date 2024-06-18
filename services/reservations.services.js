const amenities = require('../models/amenities.model');
const reservations = require('../models/reservations.model')
const { Op, Sequelize } = require("sequelize");
const {
    getCurrentDateAndTime
}= require('../helpers/helpers')
const bookingAmenityService = async(booking_data)=>{
    const {
        reservation_date,
        start_reserv_time,
        end_reserv_time,
        total_hours,
        booking_price,
        renter_name,
        renter_phone,
        id_resident_reserv,
        id_amenity_reserved
    } = booking_data
    try {
        const [booking,created]=await reservations.findOrCreate({
            where:{
                id_amenity_reserved:id_amenity_reserved,
                reservation_date: reservation_date,
                reserv_state:1,
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
            total_hours:total_hours,
            booking_price:booking_price,
            renter_name: renter_name,
            renter_phone: renter_phone,
            reserv_state:1,
            id_resident_reserv: id_resident_reserv,
            id_amenity_reserved: id_amenity_reserved
            }
        });
        if (created) {
            return {
                msg:'Se ha registrado con exito tu reserva',
                data:booking.get()
            }
        }else{
            throw new Error('El horario que escogiste no está disponible')
        }
    } catch (error) {
        throw error
    }
}

const getMyBookingService=async (reserv_id,resident_id)=>{
    try {
        const reservation = await reservations.findOne({
            where:{
                reserv_id:reserv_id,
                id_resident_reserv:resident_id,
                reserv_state:1          
            },
            attributes:['renter_name', 'renter_phone'],
            include: [
                {
                  model: amenities, // Modelo asociado (por ejemplo, PostModel)
                  as:'reservationHaveAmenity',
                  attributes: ['amenity_name'] ,// Columnas que deseas recuperar del modelo asociado
                  foreignKey: 'id_amenity_reserved'
                }
              ]
        });
        if(!reservation) throw new Error('No existe esta reserva')
        
        return {
                booking_data:reservation.get(),
                amenity_name:reservation.get().reservationHaveAmenity.dataValues.amenity_name
            }
    } catch (error) {
        throw error
    }
}
const getMyBookingListService =async(page, resident_id,columns)=>{
    const todayDate = getCurrentDateAndTime('yyyy-MM-dd')
    try {
        const offset = (parseInt(page) - 1) * 10;
        const {rows,count} =await reservations.findAndCountAll({
            attributes: columns,
            offset,
            limit: 10,
            where:{
                id_resident_reserv:resident_id,
                reserv_state:1,
                reservation_date:{
                    [Op.gte]:todayDate
                }
            },
            order: [['reservation_date', 'DESC']],
            include:[
                {
                    model:amenities,
                    as:'reservationHaveAmenity',
                    foreignKey:'id_amenity_reserved',
                    attributes:['amenity_name']
                }
            ]
        });
        if (rows.length<=0) throw new Error('No hay reservar próximas') 
        const totalPages = Math.ceil(count/10)
        const newRows = rows.map(({dataValues}) => {         
            let newObject ={
                ...dataValues,
                'amenity_name':dataValues['reservationHaveAmenity'].amenity_name
            }
            delete newObject['reservationHaveAmenity']
            return newObject
            
        });
        return {
            totalPages,
            count,
            currentPage:page,
            bookingList:newRows
        }

    } catch (error) {
        throw error
    }
}
const updateBookingService =async ( reserv_id, dataToEdit)=>{
    try {
        const [updatedBooking]  = await reservations.update(
            dataToEdit,
            {
            where:{
                reserv_id:reserv_id,
                reserv_state:1   
            }
        })
        if (updatedBooking<=0) throw new Error('No se ha podido actualizar la reserva')
        if (dataToEdit['reservation_date']) {
            const {start_reserv_time,end_reserv_time,reservation_date}=dataToEdit
            delete dataToEdit.start_reserv_time
            delete dataToEdit.end_reserv_time
            delete dataToEdit.reservation_date
            return {
                ...dataToEdit,
                id:reserv_id,
                start:start_reserv_time,
                end:end_reserv_time,
                date:reservation_date
            }
        }else{
            return dataToEdit  
        }
    } catch (error) {
        throw error
    }
    
}
const cancelBookingService = async (reserv_id,resident_id)=>{
    try {
        const [cancelBooking] = await reservations.update({
            reserv_state:0
        },
        {
            where:{
                reserv_id:reserv_id,
                id_resident_reserv:resident_id
            }
        })
        if (cancelBooking<=0) throw new Error('No se pudo cancelar tu reserva')
        return 'Se ha cancelado la reserva '
    } catch (error) {
        throw error
    }
}
const getEventsOfAmenityService=async (amenity_id,start_month,end_month,columns)=>{
    try {
        return await reservations.findAll({
            where:{
                id_amenity_reserved:amenity_id,
                reserv_state:1,
                reservation_date:{
                    [Op.between]:[start_month,end_month]
                }
            },
            attributes:columns,
            order: [['reservation_date', 'DESC']]
        }); 
    } catch (error) {
        throw error
    }
}
module.exports ={
    bookingAmenityService,
    getMyBookingService,
    getMyBookingListService,
    updateBookingService,
    cancelBookingService,
    getEventsOfAmenityService
}