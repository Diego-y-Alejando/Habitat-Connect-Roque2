const {Router, response, request}= require('express');
const router = Router();

const {residentAutenticationValidations} = require('../middlewares/jwt.middlewares');
/*=======================
RUTAS DEL PERFIL 
=========================*/
const {
    getMyResidentUserInfoController,
    updateUserInfoController
}= require('../controllers/users.controllers')
const {
    updateUserInfoValidations
} = require('../middlewares/users.middlewares');
router.get('/perfil',residentAutenticationValidations,getMyResidentUserInfoController);
router.post('/update/my/user/data/',residentAutenticationValidations,updateUserInfoValidations,updateUserInfoController);

// router.get('/request/change/email',residentAutenticationValidations,requestChangeEmailController)
// router.get('/confirm/update/email',confirmUpdateEmailvalidations,confirmUpdateEmailController)
// router.post('/update/email',updateEmaiValidations,updateEmailController);

// router.get('/request/change/password',residentAutenticationValidations,requestChangePassword);
// router.get('/confim/update/password',confirmUpdatePasswordValidations,confirmUpdatePassworController)
// router.post('/update/password',updatePasswordValidations,updatePasswordController);

// router.get('/forgot/password',forgotPasswordValidations,forgotPasswordController);
// router.get('/confirm/recover/password',confirmRecoverPasswordValidations,confirmRecoverdPasswordController)
// router.post('/recover/password',recoverPasswordValidations,recoverPasswordController);

/*=======================
RUTAS DE VISITAS EMPLEADO
=========================*/
const {
    createEmployeeForResidentsValidations,
    getResidentsEmployeesValidations,
    getResidentEmployeeDetailValidations
}=require('../middlewares/residents_employee.middlewares')
const {
    createEmployeeForResidentsController,
    getResidentsEmployeesController,
    getResidentEmployeeDetailControllers,
    getMyEmployeeListController
}= require('../controllers/residents_employee.controllers')
// la ruta de crear empleado será solo para el administrador
router.post('/create/employee',residentAutenticationValidations,createEmployeeForResidentsValidations,createEmployeeForResidentsController);
router.get('/get/residents/employees',residentAutenticationValidations,getResidentsEmployeesValidations,getResidentsEmployeesController)
router.get('/get/employe/detail/:maid_id',residentAutenticationValidations,getResidentEmployeeDetailValidations,getResidentEmployeeDetailControllers);
router.get('/get/my/employees/',residentAutenticationValidations,getResidentsEmployeesValidations,getMyEmployeeListController);
/*====================================
RUTAS DE LA RELACION RESIDENTE EMPLEADO
======================================*/
const {
    createRelationshipValidation,
    getRelationshipDetailsValidation,
    updateBossPhoneNumberValidation,
    endRelationshipValidation
}= require('../middlewares/residentEmployeRelationship.middlewares');
const {
    createRelationshipController,
    getRelationshipDetailsController,
    updateBossPhoneNumberController,
    endRelationshipController
}= require('../controllers/residentEmployeRelationship.controllers');
// se utiliza el id del empleado porque en la carga incial del frontend lo primero que se obtiene es el id del empleado lo que permite encontrar la relacion rapidamente junto con el id del residente en el token
router.post('/create/relationship/:maid_id',residentAutenticationValidations,createRelationshipValidation,createRelationshipController);
router.get('/relationship/details/:maid_id',residentAutenticationValidations,getRelationshipDetailsValidation,getRelationshipDetailsController);
router.post('/update/relationship/info/:maid_id',residentAutenticationValidations,updateBossPhoneNumberValidation,updateBossPhoneNumberController) 
// NO OLVIDAR BORRAR LAS VISITAS DEL EMPLEADO AL TERMINAR LA RELACIÓN
router.delete('/end/relationship/:relationship_id',residentAutenticationValidations, endRelationshipValidation, endRelationshipController);
/*====================================
RUTAS DEL HORARIO DE LA RELACION
======================================*/
const {
    createScheduleValidation,
    getScheduleValidation,
    editScheduleValidation,
} = require('../middlewares/resident_employee_schedule.middlewares');
const {
    createScheduleController,
    getScheduleController,
    editScheduleController
} = require('../controllers/resident_employee_schedule.controllers')
router.post('/create/schedule/for/relationship/',residentAutenticationValidations,createScheduleValidation , createScheduleController);
router.get('/relationship/schedule/:relationship_id',residentAutenticationValidations ,getScheduleValidation,getScheduleController);
router.post('/update/schedule/:relationship_id',residentAutenticationValidations , editScheduleValidation, editScheduleController);
/*==========================
RUTAS DE VISITAS DOMESTICAS
===========================*/
const {
    createHomeVisitValidations,
    editHomeVisitValidations,
    cancelOrUndoCancelValidations,
    getAllHomeVisitsValidations,
    getHomeVisitValidations
}= require('../middlewares/homeVisit.middlewares');
const {
    createHomeVisitController,
    editHomeVisitController,
    cancelHomeVisitController,
    undoCancelHomeVisitController,
    getAllHomeVisitForResidentController,
    getHomeVisitController
}= require('../controllers/homeVisit.controllers');
router.post('/create/home-visit',residentAutenticationValidations,createHomeVisitValidations,createHomeVisitController)
router.get('/get/home-visit/:visit_id',residentAutenticationValidations,getHomeVisitValidations,getHomeVisitController)
router.post('/update/home-visit/:visit_id',residentAutenticationValidations,editHomeVisitValidations,editHomeVisitController);
router.post('/cancel/home-visit/:visit_id',residentAutenticationValidations,cancelOrUndoCancelValidations,cancelHomeVisitController);
router.post('/undo/cancel/home-visit/:visit_id',residentAutenticationValidations,cancelOrUndoCancelValidations,undoCancelHomeVisitController);
router.get('/get/list/home-visit',residentAutenticationValidations,getAllHomeVisitsValidations,getAllHomeVisitForResidentController);
/*=========================
    PACKAGE DELIVERY
===========================*/
const {
    createPackageDeliveryValidations,
    editPackageDeliveryValidations,
    getPackageDeliveryInfoValidations,
    cancelOrUndoCancelPackageDeliveryValidations,
    getAllPackageDeliveryValidations
}= require('../middlewares/packageDelivery.middlewares')
const {
    createPackageDeliveryController,
    editPackageDeliveryController,
    getPackageDeliveryInfoController,
    cancelPackageDeliveryController,
    undoCancelPackageDeliveryController,
    getAllPackageDeliveryForResidentsController
}= require('../controllers/packageDelivery.controllers.js');
router.post('/create/package-delivery',residentAutenticationValidations,createPackageDeliveryValidations,createPackageDeliveryController)
router.get('/get/package-delivery/:visit_id',residentAutenticationValidations,getPackageDeliveryInfoValidations,getPackageDeliveryInfoController)
router.post('/update/package-delivery/:visit_id',residentAutenticationValidations,editPackageDeliveryValidations,editPackageDeliveryController);
router.post('/cancel/package-delivery/:visit_id',residentAutenticationValidations, cancelOrUndoCancelPackageDeliveryValidations , cancelPackageDeliveryController);
router.post('/undo/cancel/package-delivery/:visit_id',residentAutenticationValidations,cancelOrUndoCancelPackageDeliveryValidations, undoCancelPackageDeliveryController);
router.get('/get/list/package-delivery',residentAutenticationValidations,getAllPackageDeliveryValidations,getAllPackageDeliveryForResidentsController)
/*=======================
RUTAS DE RESERVAS para el usuario
=========================*/
const  {
    bookingAmenityValidations,
    getMyBookingValidations,
    getMyBookingListValidations,
    updateBookingValidations,
    cancelBookingValidations,
    getEventsOfAmenityValidations
    
}= require('../middlewares/reservations.middlewares');
const {
    bookingAmenityController,
    getMyBookingController,
    getMyBookingListController,
    updateBookingController,
    cancelBookingController,
    getEventsOfAmenityController
}= require('../controllers/reservations.controllers');
router.post('/booking/amenity/',residentAutenticationValidations,bookingAmenityValidations,bookingAmenityController);
router.get('/get/my/booking/:reserv_id',residentAutenticationValidations,getMyBookingValidations, getMyBookingController);
router.get('/get/my/booking/list',residentAutenticationValidations,getMyBookingListValidations,getMyBookingListController)
router.post('/update/my/booking/',residentAutenticationValidations,updateBookingValidations,updateBookingController);
router.post('/cancel/my/booking/:reserv_id',residentAutenticationValidations,cancelBookingValidations,cancelBookingController);
router.get('/events/',residentAutenticationValidations,getEventsOfAmenityValidations,getEventsOfAmenityController);
/*=======================
RUTAS DE AMENIDADES 
=========================*/
const {
    getAmenitiesListController,
    getAmenityDetailController
}= require('../controllers/amenities.controllers');
const {
    getAmenityDetailValidations
}= require('../middlewares/amenities.middlewares')
router.get('/amenities/',residentAutenticationValidations,getAmenitiesListController)
router.get('/amenity/detail/:amenity_name',residentAutenticationValidations,getAmenityDetailValidations,getAmenityDetailController)


module.exports=router
