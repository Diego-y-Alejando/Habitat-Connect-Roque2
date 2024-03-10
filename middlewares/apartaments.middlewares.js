const {request, response }= require('express');
const {
    validateName,
    bodyVerification,
    validationEmail,
    validatePhoneNumber,
    validationPassword,
    tokenValidation,
    ValidationIdOrLevel,
    validationOcupationState,
    userExist
}= require('../middlewares/common.middlewares');
const user = require('../models/user.model');
const apartament = require('../models/apartament.model')
const getApartamentsValidations=async(req=request , res = response, next)=>{
    const token = req.cookies.authorization
    const level = req.params.level
    try {
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        ValidationIdOrLevel('nivel deseado',level)
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        });
    }
}
const getApartamentValidations = async(req = request , res = response, next)=>{
    const token = req.cookies.authorization
    try {
        ValidationIdOrLevel('id del apartamento',req.params.apartament_id);
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        const apartamentData =  await userExist('El apartamento que solicita',apartament,req.params.apartament_id,'apartament_id',[]);
        req.apartament= apartamentData
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateParkingDataValidations = async(req= request , res = response , next)=>{
    const token = req.cookies.authorization;
    const apartament_id = req.params.apartament_id;
    try {
        ValidationIdOrLevel('id del apartamento ',apartament_id);

        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        // console.log(req.body);
        updateParkingDataValidationsBody(req.body)
        next()
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
// TODO Validar el nombre de las propiedades de los stickets
const updatePedestrianDataValidations = async(req= request , res = response , next)=>{
    const token =req.cookies.authorization
    const apartament_id = req.params.apartament_id
    try {
        ValidationIdOrLevel('id del apartamento ',apartament_id);
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        console.log(req.body);
        Object.entries(req.body).forEach(([sticker,stickerNumber]) => {
            ValidationStickerValues(stickerNumber)
        });
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const changeOcupationStateValidations = async (req = request, res = respose, next)=>{
    const token = req.cookies.authorization
    const apartament_id = req.params.apartament_id
    const {ocupation_state}= req.body
    try {
        bodyVerification(req.body,['ocupation_state'])
        validationOcupationState(ocupation_state);
        ValidationIdOrLevel('id del apartamento ',apartament_id);
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateLandlordOrTenantDataValidations = async(req= request , res = response, next)=>{
    const token = req.cookies.authorization
    const apartament_id = req.params.apartament_id
    const {name, phone_number}= req.body
    try {
        validationTenantOrLandlordData(req.body)
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const updateApartamentNameValidations = async(req= request , res = response, next)=>{
    const token = req.cookies.authorization
    const apartament_id = req.params.apartament_id
    const {apartament_name}= req.body
    try {
        validateName(apartament_name,60)
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await userExist('El apartamento que solicita',apartament,apartament_id,'apartament_id',['apartament_number', 'apartament_name', 'apartament_level', 'pedestrian_cards', 'parking_data', 'tenant_name', 'phone_number_tenant', 'landlord_name', 'phone_number_landlord', 'id_features_apartament', 'ocupation_state']);
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const path = require('path');
const error404HTML = path.join(__dirname, '..','views','404.ejs');

const getControlPanelValidations = async(req= request , res = response, next)=>{
    const token = req.cookies.authorization

    try {
        // await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        next();
    } catch (error) {
       return  res.render(error404HTML,{
            error:error.message,
            ok:false
        });
    }
}
module.exports= {
    getApartamentsValidations,
    getApartamentValidations,
    updateParkingDataValidations,
    updatePedestrianDataValidations,
    changeOcupationStateValidations,
    updateLandlordOrTenantDataValidations,
    updateApartamentNameValidations,
    getControlPanelValidations
}
// validaciones especificas de los parqueos
const updateParkingDataValidationsBody=(objectBody)=>{
    const validationsParkingData={
        'parking_cards':(value)=>{
            Object.entries(value).forEach(([sticker, stickerNumber ]) => {
                ValidationStickerValues(stickerNumber);
            });
        },
        'parking_spaces':(value)=>{
            for (let i = 0; i < value.length; i++) {
                validationParkingSpacesValues(value[i])
            }
        }
    };
    Object.keys(objectBody).forEach(propertyName=>{
        if (validationsParkingData.hasOwnProperty(propertyName)) {
            validationsParkingData[propertyName](objectBody[propertyName])
        }else{
            throw new Error('El objeto body trae una propiedad invalida')
        }
    })
}

const ValidationStickerValues=(stickerNumber)=>{
    const regexStickerNumber = /^\d{3,15}$/
    try {
        if (!stickerNumber) {
            throw new Error('El sticker viene vacio')
        }else if(!regexStickerNumber.test(stickerNumber)){
            throw new Error('El  sticker de contiene caracteres no válidos')

        }
    } catch (error) {
        throw  new Error(error)
    }
}
const validationParkingSpacesValues=(parkinSpacesValues)=>{
    const regexParkingSpaces = /^primer nivel|segundo nivel|tercer nivel|[1-9]$/
    try {
        if (!parkinSpacesValues) {
            throw new Error('No rellenaste los espacios de parqueos')
        }else if(!regexParkingSpaces.test(parkinSpacesValues)){
            throw new Error('Los espacios de parqueo contiene caracteres no válidos')

        }
    } catch (error) {
        throw  new Error(error)
    }
}
const validationTenantOrLandlordData =(body)=>{
    const validationObject ={
        'name':(value)=>{
            validateName(value,55)
        },
        'phone_number':(value)=>{
            validatePhoneNumber(value)
        }
    }
    Object.keys(body).forEach(propertyName=>{
        if (validationObject.hasOwnProperty(propertyName)) {
            validationObject[propertyName](body[propertyName])
        }else{
            throw new Error('Se han enviado propiedades inválidas');
        }
    })
}