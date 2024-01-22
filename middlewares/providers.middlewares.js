const {response,request}= require('express');
const providers = require('../models/providers.model');
const user = require('../models/user.model');

const{
    bodyVerification,
    validateName,
    validatePhoneNumber,
    validationParagraph,
    tokenValidation,
    validatePage,
    userExist,
    ValidationIdOrLevel
}= require('./common.middlewares.js')
const createProviderValidations = async (req = request , res = response , next)=>{
    const token = req.cookies.authorization
    const {
        provider_name, 
        phone_number, 
        bank_account, 
        bank_name, 
        type_account, 
        payment_methods, 
        service_description
    }= req.body
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        bodyVerification(req.body,[ 'provider_name', 'phone_number', 'bank_account', 'bank_name', 'type_account', 'payment_methods', 'service_description'])
        validateName(provider_name,75);
        validatePhoneNumber(phone_number);
        validateBankAccount(bank_account);
        validateBankName(bank_name,50);
        validateTypeAccount(type_account);
        validatePaymentMethod(payment_methods);
        validationParagraph(service_description);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const getProvidersDataValidations = async (req = request , res = response , next)=>{
    const token = req.cookies.authorization
    const page = req.query.page
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        validatePage(page)
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getProviderDataValidations =async (req = request , res = response , next)=>{
    const token = req.cookies.authorization
    const provider_id = req.params.provider_id
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El proveedor que solicita',providers,provider_id,'provider_id',['provider_name', 'phone_number', 'bank_account', 'bank_name', 'type_account', 'payment_methods', 'service_description'])
        ValidationIdOrLevel('id del proveedor',provider_id);
        next();
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateProviderValidations  = async (req = request , res = response , next)=>{
    const provider_id=req.params.provider_id
    const token = req.cookies.authorization
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist(' El proveedor que solicita',providers,provider_id,'provider_id',['provider_name', 'phone_number', 'bank_account', 'bank_name', 'type_account', 'payment_methods', 'service_description'])
        ValidationIdOrLevel('id del proveedor',provider_id);
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports={
    createProviderValidations,
    getProvidersDataValidations,
    getProviderDataValidations,
    updateProviderValidations,

}
const updateProviderBodyValidations=(body)=>{
    const bodyValidations={
        'provider_name':(value)=>{
            validateName(value,75)
        },  
        'phone_number':(value)=>{
            validatePhoneNumber(value)
        }, 
        'bank_account':(value)=>{
            validateBankAccount(value)
        }, 
        'bank_name':(value)=>{
            validateBankName(value)
        }, 
        'type_account':(value)=>{
            validateTypeAccount(value)
        }, 
        'payment_methods':(value)=>{
            validatePaymentMethod(value)
        }, 
        'service_description':(value)=>{
            validationParagraph(value)
        }
        
    }
    Object.keys(body).forEach(propertyName=>{
        if (bodyValidations.hasOwnProperty(propertyName)) {
            bodyValidations[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
}
const validateBankAccount=(bank_account)=>{
    const regexBankaccount =/^[\d]{3,}/
    if (bank_account === null || bank_account ===false) {
        throw new Error('La cuenta de banco no puede venir vacía')
    }
    if (!regexBankaccount.test(bank_account)) {
        throw new Error('La cuenta bancaria solo debe contener número')
    }
}
const validateTypeAccount =(type_account)=>{
    const allowTypesAccount = /^monetaria|ahorro|en d[o|ó]lares/gi
    if (!type_account) {
        throw new Error('El tipo de cuenta no puede venir vacío');
    }
    if (!allowTypesAccount.test(type_account)) {
        throw new Error('No es un tipo de cuenta ')
    }
}
const validatePaymentMethod =(payment_methods)=>{
    const regexPaymentMethods =/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/
    if (!payment_methods) {
        throw new Error('El método de pago no puede venir vacío')
    }if (!regexPaymentMethods.test(payment_methods)) {
        throw new Error('El método de pago contiene caractéres no válidos')
    }
}

const validateBankName = (name ) => {
    const regexBankName=/^[ a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/
    if (!name) {
      throw new Error('El nombre  del banco es obligatorio')
    } else if (!regexBankName.test(name)) {
      throw new Error('El nombre  del banco sólo puede contener letras y espacios')
    }
    
}