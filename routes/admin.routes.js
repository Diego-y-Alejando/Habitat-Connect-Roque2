const {Router, response, request}= require('express');
const router = Router()


const {
    loggin
}= require('../controllers/loggin.controllers');
const {
    logginValidations
}= require('../middlewares/logginValidations.middlewares');
router.post('/loggin',logginValidations,loggin)

const {
    getApartamentsValidations
}= require('../middlewares/apartaments.middlewares')
const {
    getApartaments
}= require('../controllers/apartaments.controllers')
router.get('/apartamentos',getApartamentsValidations,getApartaments)
module.exports=router