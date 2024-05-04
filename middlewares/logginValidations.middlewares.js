const {request, response }= require('express');
const bcrypt = require('bcrypt')
const {
    bodyVerification,
    validationEmail,
    validationPassword,
    userExist
}= require('../middlewares/common.middlewares');
const user = require('../models/user.model');
const security_user = require('../models/securityUser.model')
const logginValidations=async  (req= request, res = response, next)=>{
    try {
        bodyVerification(req.body,['email','password','user_type']);
        validationEmail(req.body.email);
        validationPassword(req.body.password);
        validationUserType(req.body.user_type);
        let userData ;
        if (req.body.user_type==='admin') {
            userData =await userExist('El usuario que solicita',user,req.body.email,'email',['name','lastname','email','phone_number','dpi']);
            req.userData = {
                user_id:userData.user_id ,
                user_type:userData.user_type,
            }
        }else if(req.body.user_type==='security'){
            userData =await userExist('El usuario que solicita',security_user,req.body.email,'email',['name', 'lastname', 'email']);
            req.userData = {
                user_id:userData.security_user_id,
                user_type:userData.user_type,
            }
        }         
        // const validatePassword = bcrypt.compareSync(req.body.password,userData.password);
        // if (!validatePassword) {
        //    throw new Error('Contraseña incorrecta')
        // }
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

const validationUserType = (user_type)=>{
    const allowUserTypes =['admin','security']
    if (!user_type) {
        throw new Error('El tipo de usuario no puede venir vacío');
    }
    if (!allowUserTypes.includes(user_type)){
        throw new Error('El tipo de usuario no es correcto')
        
    }
}