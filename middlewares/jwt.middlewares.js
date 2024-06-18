const {request, response}= require('express');

const {
    tokenValidation
}= require('./common.middlewares')

const admin_users = require('../models/admin_users');
const resident_users = require('../models/resident_users.model')
const adminAutenticationValidations =async (req = request , res = response,next)=>{
    const token = req.cookies.authorization
    try {
        await tokenValidation(token,admin_users,process.env.SECRETKEYAUTH,['admin'])
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const residentAutenticationValidations =async (req = request , res = response,next)=>{
    const token = req.cookies.authorization
    try {
        const {id,user_type} = await tokenValidation(token,resident_users,process.env.SECRETKEYAUTH,['resident'])
        req.resident_id= id
        req.user_type= user_type
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const securityAutenticationValidations =async (req = request , res = response,next)=>{
    const token = req.cookies.authorization
    try {
        const {id,user_type} = await tokenValidation(token,resident_users,process.env.SECRETKEYAUTH,['security'])
        req.security_id= id
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports={
    adminAutenticationValidations,
    residentAutenticationValidations,
    securityAutenticationValidations
}