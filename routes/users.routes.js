const {Router, response, request}= require('express');
const router = Router()



const {loginController}= require('../controllers/users.controllers');
const {loginValidations}= require('../middlewares/users.middlewares');
router.post('/login',loginValidations,loginController);

/* ===================
    RUTAS FRONTEND
======================*/
const {frontendLoggin} = require('../controllers/views.controllers')
router.get('/login',frontendLoggin);
module.exports=router;