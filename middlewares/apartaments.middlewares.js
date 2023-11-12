const {request, response }= require('express');
const {
    bodyVerification,
    validationEmail,
    validationPassword,
    tokenValidation
}= require('../middlewares/common.middlewares');
const user = require('../models/user.model');
const getApartamentsValidations=async(req=request , res = response, next)=>{
    const token = req.headers.authorization
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi'],process.env.SECRETKEYAUTH,['admin']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}

module.exports= {
    getApartamentsValidations
}