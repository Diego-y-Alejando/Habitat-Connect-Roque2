const {Router, response, request}= require('express');
const router = Router()
const {
    loggin
}= require('../controllers/loggin.controllers');
const {
    logginValidations
}= require('../middlewares/logginValidations.middlewares');
router.post('/login',logginValidations,loggin);
/*=======================
    RUTAS DE APARTAMENTO 
=========================*/
const {
    getApartamentsValidations,
    getApartamentValidations,
    updateParkingDataValidations,
    updatePedestrianDataValidations,
    changeOcupationStateValidations,
    updateLandlordOrTenantDataValidations,
    updateApartamentNameValidations,
    getControlPanelValidations
}= require('../middlewares/apartaments.middlewares')
const {
    getApartaments,
    getApartament,
    updateParkingData,
    updatePedestrianData,
    changeOcupationState,
    updateLanlordData,
    updateTenantData,
    updateApartamentName,
    getControlPanel
}= require('../controllers/apartaments.controllers');
router.get('/apartamentos/:level',getApartamentsValidations,getApartaments);
router.get('/apartamentos/',getControlPanelValidations,getControlPanel)
// aplicar carga diferida al momento de lanzarlo a produccón
router.get('/apartamento/:apartament_id',getApartamentValidations,getApartament);
router.post('/update/data/parking/:apartament_id',updateParkingDataValidations, updateParkingData);
router.post('/update/data/pedestrian/:apartament_id',updatePedestrianDataValidations, updatePedestrianData);
router.post('/update/ocupation/state/:apartament_id',changeOcupationStateValidations, changeOcupationState);
router.post('/update/landlord/data/:apartament_id',updateLandlordOrTenantDataValidations, updateLanlordData);
router.post('/update/tenant/data/:apartament_id',updateLandlordOrTenantDataValidations,updateTenantData);
router.post('/update/apartament/name/:apartament_id',updateApartamentNameValidations,updateApartamentName);

/*=======================
    RUTAS DE AMENIDADES para el admin
=========================*/
const {
    getAmenitiesValidations,
    updateAmenityDataValidations,
    getAmenitiesForBookingValidations
} = require('../middlewares/amenities.middlewares');
const {
    getAmenities,
    updateAmenityData,
}= require('../controllers/amenities.controllers')
router.get('/amenities/',getAmenitiesValidations,getAmenities);
router.post('/update/amenity/data/:amenity_id',updateAmenityDataValidations,updateAmenityData);

/*=======================
    Obtener el link para la reserva del usuario 
=========================*/
const  {getLinkForBookingValidations,getEventsOfAmenityValidationsAdmin}= require('../middlewares/reservations.middlewares');
const {getLinkForBooking,getEventsOfAmenity}= require('../controllers/reservations.controllers')
router.get('/get/link/for/booking/:apartament_id',getLinkForBookingValidations,getLinkForBooking);
router.get('/events/',getEventsOfAmenityValidationsAdmin,getEventsOfAmenity);
