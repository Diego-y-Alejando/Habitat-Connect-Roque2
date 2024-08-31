const {request, response}= require('express');

const {
    tokenValidation
}= require('./common.middlewares')
const {
    redisClient
}  =require('../redis/redisClient')
const admin_users = require('../models/admin_users');
const resident_users = require('../models/resident_users.model')
const adminAutenticationValidations =async (req = request , res = response,next)=>{
    const token = req.cookies.authorization
    try {
        if (!req.session.user) {
            throw new Error('No has iniciado sesion')
          }
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
        console.log(req.session);
        if (!req.session.user) {
            throw new Error('No has iniciado sesion')
        }
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

const checkAuthValidations = async (req = request , res = response , next)=>{
    const token = req.cookies.authorization
    try {
        const sessionPrefix ='sess:'
        const session = await redisClient.get(`${sessionPrefix}${req.sessionID}`)
        if (!session) {
            throw new Error('No estas autenticado')
        }
        const user =  JSON.parse(session).user
        const {user_type,name}=user

        if (token) {
            await validationsCheckAuthForJwt(user_type,token)
            req.user =user        
        }
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const validationsCheckAuthForJwt =async (user_type,token)=>{
    const jwtOptions ={
        'resident':async (token)=>{
            await tokenValidation(token,resident_users,process.env.SECRETKEYAUTH,['resident'])
        },
        'admin':async (token)=>{
            await tokenValidation(token,admin_users,process.env.SECRETKEYAUTH,['admin'])
        }
    }
    try {
        if (jwtOptions.hasOwnProperty(user_type)) {
            await jwtOptions[user_type](token)
        }else{
            throw new Error('Se han enviado usuario invalido');
        }
    } catch (error) {
        throw error
    }
   
}
module.exports={
    checkAuthValidations,
    adminAutenticationValidations,
    residentAutenticationValidations,
    securityAutenticationValidations
}