const {Router, response, request}= require('express');
const router = Router()


const {adminAutenticationValidations}= require('../middlewares/jwt.middlewares')

/*=======================
    RUTAS PARA CREAR USUARIOS RESIDENTES 
=========================*/
const {createUserValidations}= require('../middlewares/users.middlewares');
const {createResidentUserController} = require('../controllers/users.controllers')
router.post('/create/resident/',adminAutenticationValidations,createUserValidations,createResidentUserController);


const {
    getApartamentsValidations,
    getApartamentDetailValidations,
    updateLandlordDataValidations,
    updateApartamentNameValidations,
    
    getControlPanelValidations
}= require('../middlewares/apartaments.middlewares')
const {
    getApartamentsListController,
    getApartamentDetailController,
    updateApartamentNameController,
    getResidentAndLandlordController,
    updateLandlordDataController,
}= require('../controllers/apartaments.controllers');
router.get('/apartamentos/:level',getApartamentsValidations,getApartamentsListController);
router.get('/apartamento/:apartament_id',getApartamentDetailValidations,getApartamentDetailController);
router.get('/resident-landlord/data/:apartament_id',getApartamentDetailValidations,getResidentAndLandlordController);
router.post('/update/apartament/name/:apartament_id',updateApartamentNameValidations,updateApartamentNameController);
//router.post('/update/landlord/data/:apartament_id',updateLandlordDataValidations, updateLandlordDataController);

/*=======================
    RUTAS DE AMENIDADES para el admin
=========================*/
const {
    updateAmenityDataValidations,
    ableAndDisabledAmenityValidations
} = require('../middlewares/amenities.middlewares');
const {
    getAmenitiesListController,
    updateAmenityData,
    disableAmenityController,
    ableAmenityController
}= require('../controllers/amenities.controllers')
router.get('/amenities/',adminAutenticationValidations,getAmenitiesListController);
router.post('/update/amenity/data/:amenity_id',adminAutenticationValidations,updateAmenityDataValidations,updateAmenityData);
router.post('/disabled/amenity',adminAutenticationValidations, ableAndDisabledAmenityValidations, disableAmenityController)
router.post('/able/amenity',adminAutenticationValidations, ableAndDisabledAmenityValidations, ableAmenityController)
/*=======================
    RUTAS DE VISTAS ADMIN 
=========================*/
const{
    getAdminControlPanelController
}= require('../controllers/views.controllers')
router.get('/panel-de-control/',getAdminControlPanelController)



module.exports=router;
