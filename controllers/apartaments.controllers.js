
const {request, response }= require('express');
const {sequelizeObj}= require('../database/config');
const {
    findData,
    updateData,
    changeObjectNames
}= require('../helpers/helpers')
const {
    getApartamentsListService,
    getApartamentDetailService,
    getResidentAndLandlordService,
    updateApartamentNameService
}= require('../services/apartaments.services')
const getApartamentsListController= async(req= request , res = response)=>{
    const level =parseInt(req.params.level)
    try{
        const apartamentsLevel = await getApartamentsListService(level);
        const newApartamentList = apartamentsLevel.map((apartament)=>{
           const {dataValues}= apartament
           const {apartamentFeatures,apartamentHaveResident}= dataValues
            delete dataValues['apartamentFeatures']
            delete dataValues['apartamentHaveResident']
           return {
                ...dataValues,
                area :apartamentFeatures['dataValues'].area,
                resdient_phone :apartamentHaveResident['dataValues']['residentHaveUserInfo'].phone_number
           }
        })
        console.log(newApartamentList);
        return res.status(200).json({
            [`level_${level}`]:newApartamentList,
            ok:true
        })
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            
            ok:false
        })
    }
}
const getApartamentDetailController = async(req = request , res = response)=>{

    try {
        // aplicar la carga diferida separando los datos devueltos 
        const apartamentData = await getApartamentDetailService(req.params.apartament_id)
        return res.status(200).json({
            ok:true,
            apartamentData
        })
        // return res.render(apartmentDetailHTML,{
        //     BASE_URL:process.env.BASE_URL,
        //     apartamentData
        // })
        
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const getResidentAndLandlordController =async (req = request , res = response)=>{

    try {
        const landlordAndResidentData =await getResidentAndLandlordService(req.params.apartament_id)
        return res.status(200).json({
            ok:true,
            landlordAndResidentData
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateLandlordDataController =async(req = request , res = response)=>{
    try {
        
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateApartamentNameController = async(req = request , res = response)=>{
    const apartament_id = req.params.apartament_id
    try {
        const updatedApartamentName = await updateApartamentNameService(req.body,apartament_id)
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


module.exports={
    getApartamentsListController,
    getApartamentDetailController,
    updateApartamentNameController,
    getResidentAndLandlordController,
    
}