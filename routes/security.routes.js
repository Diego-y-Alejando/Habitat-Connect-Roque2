const {Router, response, request}= require('express');
const router = Router()
const {
    viewSecurityControlPanelController
}= require('../controllers/securityViewsController')

router.get('/panel-de-control/',viewSecurityControlPanelController);


/*=========================
    HOME VISITS
===========================*/
const {
    createHomeVisitValidations,
    checkHomeVisitValidations,
    getHomeVisitsValidations,
    searchHomeVisitsValidations,
    undoCheckHomeVisitValidations
    getHomeVisitsValidations,
} = require ('../middlewares/homeVisit.middlewares')
const {
    createHomeVisitController,
    checkHomeVisitController,
    getAllHomeVisitsForSecurityControlller,
    searchHomeVistisController,
    undoCheckHomeVisitController
}= require('../controllers/homeVisit.controllers')

router.post('/check/home-visit/',checkHomeVisitValidations,checkHomeVisitController);
router.get('/get/home-visit/',getAllHomeVisitsForSecurityControlller);
router.get('/search/home-visit',searchHomeVistisController);
router.post('/undo/check/home-visit',undoCheckHomeVisitController)

/*=========================
    PACKAGE DELIVERY
===========================*/
const {
    createPackageDeliveryValidations,
    checkPackageDeliveryValidations,
    getPackageDeliveriesValidations,
    searchPackageDeliveryValidations,
    undoCheckPackageDeliveryValidations
}= require('../middlewares/packageDelivery.middlewares')
const {
    createPackageDeliveryController,
    checkPackageDeliveryController,
    getAllPackageDeliveryController,
    searchPackageDeliveryController,
    undoCheckPackageDeliveryController
}= require('../controllers/packageDelivery.controllers.js');
router.post('/create/package-delivery/',createPackageDeliveryValidations,createPackageDeliveryController);
router.post('/check/package-delivery/',checkPackageDeliveryValidations,checkPackageDeliveryController);
router.get('/get/package-delivery/',getAllPackageDeliveryController)
router.get('/search/delivery',searchPackageDeliveryController);
router.post('/undo/check/package-delivery',undoCheckPackageDeliveryValidations,undoCheckPackageDeliveryController);


/*=========================
    EMPLOYEE VISITS
===========================*/

const{
    createEmployeeVisitValidations,
    checkEmployeeVisitValidations,
    getEmployeeVisitsValidations,
    searchEmployeeVisitValidations,
    undoCheckEmployeeVisitValidations
}= require('../middlewares/securityMiddlewares/employeeVisit.middlewares')
const{
    createEmployeeVisitController,
    checkEmployeeVisitsController,
    getEmployeeVisitsController,
    searchEmployeeVisitController,
    undoCheckEmployeeVisitController
}= require('../controllers/securityControllers/employeeVisit.controllers');
router.post('/create/employee-visit/',createEmployeeVisitValidations,createEmployeeVisitController);
router.post('/check/employee-visit/',checkEmployeeVisitValidations,checkEmployeeVisitsController);
router.get('/get/employee-visits',getEmployeeVisitsValidations,getEmployeeVisitsController)
router.get('/search/employee-visits',searchEmployeeVisitValidations,searchEmployeeVisitController)
router.post('/undo/check/employee-visit',undoCheckEmployeeVisitValidations,undoCheckEmployeeVisitController);

module.exports=router;