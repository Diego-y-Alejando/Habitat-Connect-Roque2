const {request , response} = require('express');


const {
    jwtGenerate,
    getStartAndEndOfMonth,
    changeObjectNames
}= require('../helpers/helpers');
const path = require('path');
const myBookinHTML = path.join(__dirname, '..','views','myBooking.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const {
    bookingAmenityService,
    getMyBookingService,
    getMyBookingListService,
    updateBookingService,
    cancelBookingService,
    getEventsOfAmenityService
}= require('../services/reservations.services')
const bookingAmenityController = async (req = request , res = response)=>{
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
    } = req.body 
    try {
        let newData
        const {data,msg} = await bookingAmenityService(req.body)
        delete data.renter_name
        delete data.renter_phone
        delete data.id_amenity_reserved
        delete data.id_resident_reserv
        newData = {
            ...data
        }
        return res.status(200).json({
            ok:true,
           msg:msg,
           booking_data:newData
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const getMyBookingController = async(req = request , res = response)=>{
    const reserv_id = req.params.reserv_id
    try {
        const {booking_data} =await getMyBookingService (reserv_id,req.resident_id)
        return res.status(200).json({
            ...booking_data,
            ok:true
        });
        
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateBookingController = async (req = request , res = response)=>{
    const {
        reserv_id,
        reservation_date,
        start_reserv_time,
        end_reserv_time,
        renter_name,
        renter_phone,
        id_amenity_reserved
    } = req.body  
    try {
        delete req.body.reserv_id
        delete req.body.id_amenity_reserved
        const dataUpdated = await updateBookingService(reserv_id,req.body)
        return res.status(200).json({
            msg:'Se ha actualizado tu reserva',
            dataUpdated
        })
        
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}

const cancelBookingController= async (req = request , res = response)=>{
    const reserv_id=req.params.reserv_id
    try {
        const cancelBooking= await cancelBookingService(reserv_id,req.resident_id);
        return res.status(200).json({
            ok:true,
            msg:cancelBooking
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getEventsOfAmenityController = async (req = request , res = response)=>{
    const {amenity_id, date}= req.query
    try {

        const {start_month,end_month} =getStartAndEndOfMonth(date)
        const events = await getEventsOfAmenityService (amenity_id,start_month,end_month,['reserv_id','reservation_date','start_reserv_time','end_reserv_time'])

        let newEvents=[]
        if (events.length>0){
            events.forEach(event => {
                const eventdata = event.get();
                const newObjectEvent=changeObjectNames(eventdata, {
                    "reserv_id": "id",
                    "reservation_date": "date",
                    "start_reserv_time": "start",
                    "end_reserv_time": "end"
                });
                newEvents.push(newObjectEvent)
            });
        }
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
const getMyBookingListController = async (req= request , res = response)=>{
    const page = req.query.page
    try {
        const {bookingList,totalPages,currentPage,count} = await getMyBookingListService (page,req.resident_id,['reserv_id','reservation_date','start_reserv_time','end_reserv_time','total_hours','booking_price','id_amenity_reserved'])
        return res.status(200).json({
            bookingList,
            totalPages,
            currentPage,
            count,
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
    bookingAmenityController,
    updateBookingController,
    getMyBookingController,
    cancelBookingController,
    getEventsOfAmenityController,
    getMyBookingListController,
    
}