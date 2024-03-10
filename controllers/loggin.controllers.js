const {request,response}= require('express');
const user = require('../models/user.model');
const path = require('path');
const {cookieOptions}= require('../helpers/helpers')
const {
    jwtGenerate,
    hashingPassword,
    updateData,
}= require('../helpers/helpers')
const loggin = async (req= request , res = response)=>{
    try {
        const token = await jwtGenerate(req.userData.user_id,req.userData.user_type,process.env.SECRETKEYAUTH,'4h')
        res.cookie('authorization', token, cookieOptions);  
        return res.status(200).json({
            msg:'Has iniciado sesion',
            ok:true,
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports= {
    loggin
}