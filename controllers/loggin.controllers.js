const {request,response}= require('express');
const user = require('../models/user.model');
const {
    jwtGenerate,
    hashingPassword,
    updateData
}= require('../helpers/helpers')
const loggin = async (req= request , res = response)=>{
    try {
        const token = await jwtGenerate(req.userData.user_id,req.userData.user_type,process.env.SECRETKEYAUTH)
        return res.status(200).json({
            msg:'Has iniciado sesion',
            ok:true,
            token,
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