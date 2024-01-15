const {request,response}= require('express');
const user = require('../models/user.model');
const path = require('path');
const {
    jwtGenerate,
    hashingPassword,
    updateData
}= require('../helpers/helpers')
const loggin = async (req= request , res = response)=>{
    try {
        const token = await jwtGenerate(req.userData.user_id,req.userData.user_type,process.env.SECRETKEYAUTH,'4h')
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
const frontendLoggin = (req = request , res = response)=>{
    const logginHTML = path.join(__dirname, '..','views', 'login.ejs');
    res.render(logginHTML,{BASE_URL:process.env.BASE_URL});
}
module.exports= {
    loggin,
    frontendLoggin
}