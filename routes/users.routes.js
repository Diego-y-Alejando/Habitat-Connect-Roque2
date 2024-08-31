const {Router, response, request}= require('express');
const router = Router()



const {loginController,logOutController,checkAuthController}= require('../controllers/users.controllers');
const {loginValidations}= require('../middlewares/users.middlewares');
const {checkAuthValidations} = require('../middlewares/jwt.middlewares');
router.post('/login',loginValidations,loginController);
router.post('/check-auth',checkAuthValidations,checkAuthController)

// añadir el middleware para cerrar sesion 

router.post('/log-out/',logOutController);
module.exports=router;