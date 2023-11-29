const {request, response }= require('express');
const bcrypt = require('bcrypt')
const {
    bodyVerification,
    validationEmail,
    validationPassword,
    userExist
}= require('../middlewares/common.middlewares');
const user = require('../models/user.model');
const logginValidations=async  (req= request, res = response, next)=>{
    try {
        bodyVerification(req.body,['email','password']);
        validationEmail(req.body.email);
        validationPassword(req.body.password);
        const userData =await userExist('Usuario que solicita',user,req.body.email,'email',['name','lastname','email','phone_number','dpi']);
        const validatePassword = bcrypt.compareSync(req.body.password,userData.password);
        if (!validatePassword) {
           throw new Error('Contraseña incorrecta')
        }
        req.userData = {
            user_id:userData.user_id,
            user_type:userData.user_type,
        }
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
   
}

module.exports={
    logginValidations
}