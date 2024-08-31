const {request,response}= require('express');
const path = require('path');
const {cookieOptions,saveSession}= require('../helpers/helpers')
const {
    redisClient
}  =require('../redis/redisClient')
const {
    jwtGenerate,
    hashingPassword,
    updateData,
}= require('../helpers/helpers')
const {getAdminIdService} = require('../services/admin_users.services.js')
const {
    getResidentIdService,
    createResidentService,
    getMyResidentUserInfoService,
    getUserInfoIdOfResidentService
} = require('../services/resident_users.services.js');
const {getSecurityIdService} = require('../services/security_users.services.js');
const {residentDesignatedForApartment} = require('../services/apartaments.services')
const {
    createUserService,
    updateUserInfoService
} = require('../services/users.services.js')
const {sequelizeObj} =require('../database/config')

const loginController = async (req= request , res = response)=>{

    const {user_id,user_type,name}= req.userData
    try {
        const getIdForTokenService = {
            admin: getAdminIdService,
            resident: getResidentIdService,
            security: getSecurityIdService,
        };
        let idForToken;
        if (getIdForTokenService[user_type]) {
            idForToken = await getIdForTokenService[user_type](user_id);
        }else{
            throw new Error('El tipo de usuario no es correcto');
        }
        const token = await jwtGenerate(idForToken,user_type,process.env.SECRETKEYAUTH,'24h')
        req.session.user = {
            user_type:user_type,
            name:name
        }
        await saveSession(req);
        res.cookie('authorization', token, cookieOptions); 
        return res.status(200).json({
            user_type,
            name,
            ok:true
        });
     
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const logOutController =(req = request , res = response)=>{
    try {
        if (req.session) {
            req.session.destroy((err) => {
              if (err) throw new Error(err)
              
              res.clearCookie('session'); // Nombre por defecto de la cookie de sesión
              res.clearCookie('authorization')
              return res.status(200).json({
                msg:'Sesion cerrada exitosamente'
              })
            });
        } else {
            throw new Error('No Hay sesiones activas')
        }
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const checkAuthController =  async (req = request , res = response)=>{
    try {
        if (!req.user) {
           throw new Error('No viene el token de autenticación')
        }
        return res.status(200).json({
            ...req.user, 
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
// SOLO CREA USUARIOS DE TIPO RESIDENTE 
const createResidentUserController = async (req = request , res = response)=>{
    const {name,lastname,email,phone_number,dpi,apartament_id,apartament_name} = req.body 
    try {
        const hashPassword = hashingPassword('residente1234')
        const result = await sequelizeObj.transaction(async createResidentUserTansaction=>{
            const user = await createUserService({
                email:email,
                phone_number:phone_number,
                dpi:dpi
            },{
                name:name,
                lastname:lastname,
                password:hashPassword,
                user_type:'resident'
            },createResidentUserTansaction);
            // se le asigna un identificador de residente al usuario 
            const resident_user_id = await createResidentService(user.user_id,createResidentUserTansaction);
             // se le asigna al ususario un apartamento
            await residentDesignatedForApartment(apartament_id,{
                id_resident_apartament :resident_user_id,
                apartament_name:apartament_name
            },createResidentUserTansaction)
        });
        return res.status(200).json({
            msg:'Has creado la cuenta del residente',
            ok:true
        })

    } catch (error) {
     
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getMyResidentUserInfoController =async(req = request , res = response)=>{
    try {
        const dataResident = await getMyResidentUserInfoService(req.resident_id)
        return res.status(200).json({
            data:dataResident,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateUserInfoController =async (req = request , res = response)=>{
    const user_type = req.user_type
    try {
        const getUserId = {
            resident: getUserInfoIdOfResidentService,
        };
        let user_id;
        if (getUserId[user_type]) {
            user_id = await getUserId[user_type](req.resident_id);
        }else{
            throw new Error('El tipo de usuario no es correcto');
        }
        const updatedInfo = await updateUserInfoService(user_id,req.body)
        return res.status(200).json({
            msg:updatedInfo,
            ok:true
        });
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}


module.exports= {
    loginController,
    checkAuthController,
    logOutController,
    createResidentUserController,
    getMyResidentUserInfoController,
    updateUserInfoController    
}