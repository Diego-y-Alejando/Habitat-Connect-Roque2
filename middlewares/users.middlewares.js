const {request, response }= require('express');
const bcrypt = require('bcrypt')
const {
    bodyVerification,
    validateName,
    validateLastName,
    validateDpi,
    validatePhoneNumber,
    validationEmail,
    validationPassword,
    ValidationIdOrLevel,
    recordExist
}= require('../middlewares/common.middlewares');
const {
    checkUserEmailExistAndReturnPasswordService
}= require('../services/users.services')
const {
    redisClient
}  =require('../redis/redisClient')
const users = require('../models/users.model');
const security_users = require('../models/security_users.model');
const apartaments= require('../models/apartaments.model')
const loginValidations=async  (req= request, res = response, next)=>{
    const {email ,password}= req.body
    try {
        bodyVerification(req.body,['email','password']);
        validationEmail(email);
        validationPassword(password);
        
        const {user_id,user_type,pass,name}= await checkUserEmailExistAndReturnPasswordService(email)
        req.userData={
            'user_id':user_id,
            'user_type':user_type,
            'name': name
        }
       
        // const validatePassword = bcrypt.compareSync(req.body.password,pass);
        // if (!validatePassword) {
        //    throw new Error('Contraseña incorrecta')
        // }
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
   
}
const createUserValidations =async(req = request , res = response, next)=>{
    const {name,lastname,email,phone_number,dpi,apartament_id,apartament_name} = req.body
    try {
        bodyVerification(req.body,['name','lastname','email','phone_number','dpi','apartament_id','apartament_name'])
        validateName(name,55);
        validateName(apartament_name,55);
        validateLastName(lastname);
        validationEmail(email);
        validatePhoneNumber(phone_number);
        validateDpi(dpi);
        ValidationIdOrLevel('id del apartamento',apartament_id);
        await recordExist('El apartamento que desea asignar no existe',apartaments,apartament_id);
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateUserInfoValidations=async(req = request , res = response, next)=>{
    
    try {
        editUserInfoValidations(req.body);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports={
    loginValidations,
    createUserValidations,
    updateUserInfoValidations
}
const editUserInfoValidations=(body)=>{
    const bodyValidations = {
        'name':(value)=>{
            validateName(value,55);
            
        },
        'lastname':(value)=>{
            validateLastName(value);  
        },
        'phone_number':(value)=>{
            validatePhoneNumber(value);
        },
    }
    Object.keys(body).forEach(propertyName=>{
        if (bodyValidations.hasOwnProperty(propertyName)) {
            bodyValidations[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
}