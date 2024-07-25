const {Router, response, request}= require('express');
const router = Router()



const {loginController,logOutController}= require('../controllers/users.controllers');
const {loginValidations}= require('../middlewares/users.middlewares');
router.post('/login',loginValidations,loginController);

router.post('/log-out/',logOutController);
module.exports=router;