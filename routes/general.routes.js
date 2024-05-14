const {Router, response, request}= require('express');
const router = Router()
const {
    loggin
}= require('../controllers/loggin.controllers');
const {
    logginValidations
}= require('../middlewares/logginValidations.middlewares');

router.post('/login',logginValidations,loggin);


/* ===================
    RUTAS FRONTEND
======================*/
const {
    frontendLoggin,
} = require('../controllers/frontendViews.controllers')
router.get('/login',frontendLoggin);
module.exports=router;