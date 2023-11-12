const {request, response }= require('express');


const apartament = require('../models/apartament.model')
const features_apartaments = require('../models/features_apartament.model')
const getApartaments= async(req= request , res = response)=>{
    const level =parseInt( req.query.level)
    try{
        
        const apartamentsLevelList = await apartament.findAll({
            where:{ 
                apartament_level:1 
            }, 
            attributes:['apartament_id','apartament_number','apartament_name','phone_number_tenant'],
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
        msg:'get-aptos',
        apartamentsLevelList
       })
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports={
    getApartaments,
}