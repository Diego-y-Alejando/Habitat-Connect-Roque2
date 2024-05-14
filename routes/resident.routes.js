const {Router, response, request}= require('express');
const router = Router();
/*=======================
    RUTAS DE RESERVAS para el usuario
=========================*/
const  {
    bookingAmenityValidations,
    updateBookingValidations,
    getMyBookingValidations,
    cancelBookingValidations,
    getEventsOfAmenityValidationsUser
}= require('../middlewares/reservations.middlewares');
const {
    bookingAmenity,
    updateBooking,
    getMybooking,
    cancelBooking,
    getEventsOfAmenity,
}= require('../controllers/reservations.controllers')
router.post('/booking/amenity/',bookingAmenityValidations,bookingAmenity);
router.get('/get/my/reservation/',getMyBookingValidations, getMybooking);
router.post('/update/my/reservation/',updateBookingValidations,updateBooking);
router.post('/cancel/my/reservation/:reserv_id',cancelBookingValidations,cancelBooking)
router.get('/events/',getEventsOfAmenityValidationsUser,getEventsOfAmenity);
const {
    getAmenitiesForBookingValidations
} = require('../middlewares/amenities.middlewares');
const {
    getAmenities,
}= require('../controllers/amenities.controllers')
router.get('/amenities/for/booking/',getAmenitiesForBookingValidations,getAmenities)
module.exports=router