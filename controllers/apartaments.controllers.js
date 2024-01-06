const {request, response }= require('express');
const {sequelizeObj}= require('../database/config');
const {
    findData,
    updateData
}= require('../helpers/helpers')
const apartament = require('../models/apartament.model')
const features_apartaments = require('../models/features_apartament.model')
const getApartaments= async(req= request , res = response)=>{
    const level =parseInt(req.params.level)
    try{
        
        const apartamentLevel = await apartament.findAll({
            where:{ 
                apartament_level:level 
            }, 
            attributes:['apartament_id','apartament_number','apartament_name','phone_number_tenant','phone_number_landlord','ocupation_state'],
            include: [
                {
                  model: features_apartaments, // Modelo asociado (por ejemplo, PostModel)
                  as:'apartamentFeatures',
                  attributes: ['area'] ,// Columnas que deseas recuperar del modelo asociado
                  foreignKey: 'id_features_apartament'
                }
              ]
        });
       return res.status(200).json({
            [`level_${level}`]:apartamentLevel,
            ok:true
       })
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getApartament = async(req = request , res = response)=>{
    try {

        // aplicar la carga diferida separando los datos devueltos 
        const features_apartament = await findData(features_apartaments,req.apartament.id_features_apartament,'feature_id',['feature_id']);
        return res.json({
            apartamentData:req.apartament,
            features_apartament,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateParkingData = async(req=request , res = response, next)=>{
    const apartament_id = req.params.apartament_id;
    try {
        const update = await apartament.update(
            { parking_data: sequelizeObj.literal(`'${JSON.stringify(req.body)}'`)},{
            where:{
                'apartament_id':apartament_id
            }
        }); 
        if (update>0) {
            return res.status(200).json({
                msg:'Se ha actualizado el registro',
                ok:true
            });
        }  
        else{
            throw new Error('No se ha podido actualizar los parqueos')
        }   
    
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updatePedestrianData = async(req=request , res = response, next)=>{
    const apartament_id = req.params.apartament_id
    try {
        const update = await apartament.update(
            { pedestrian_cards: sequelizeObj.literal(`'${JSON.stringify(req.body)}'`)},{
            where:{
                'apartament_id':apartament_id
            }
        }); 
        if (update>0) {
            return res.status(200).json({
                msg:'Se ha actualizado el registro',
                ok:true
            });
        }  
        else{
            throw new Error('No se ha podido actualizar los parqueos')
        }   
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const changeOcupationState= async(req = request , res = response , next)=>{
    const apartament_id = req.params.apartament_id
    try {
        const updatedData = await updateData(apartament,req.body,apartament_id,'apartament_id')
        return res.status(200).json({
            msg:updatedData,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const  updateLanlordData= async(req = request , res = response)=>{
    const apartament_id = req.params.apartament_id
    const {name,phone_number}= req.body
    try {
        const updatedLandlordData = await updateData(apartament,{
            landlord_name:name,
            phone_number_landlord:phone_number
        },apartament_id,'apartament_id')
        return res.status(200).json({
            msg:updatedLandlordData,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateTenantData = async(req = request , res = response)=>{
    const apartament_id = req.params.apartament_id
    const {name,phone_number}= req.body
    try {
        const updateTenantData = await updateData(apartament,{
            tenant_name:name,
            phone_number_tenant:phone_number
        },apartament_id,'apartament_id')
        return res.status(200).json({
            msg:updateTenantData,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateApartamentName = async(req = request , res = response)=>{
    const apartament_id = req.params.apartament_id
    try {
        const updatedApartamentName = await updateData(apartament,req.body,apartament_id,'apartament_id')
        return res.status(200).json({
            msg:updatedApartamentName,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const path = require('path');
const controlPanel = path.join(__dirname, '..','views','controlPanel.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const getControlPanel =(req = request , res = response)=>{
    try {
        return  res.render(controlPanel,{});
    } catch (error) {
        return  res.render(error404HTML,{
            error:error.message,
            ok:false
        });
    }
}
module.exports={
    getApartaments,
    getApartament,
    updateParkingData,
    updatePedestrianData,
    changeOcupationState,
    updateLanlordData,
    updateTenantData,
    updateApartamentName,
    getControlPanel
}