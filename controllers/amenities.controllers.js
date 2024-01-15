const {request , response} = require('express');
const amenities = require('../models/amenities.model');
const {Sequelize} = require('sequelize')
const {
    updateData,
    formatHour
}= require('../helpers/helpers')
const path = require('path');
const amenitiesHTML = path.join(__dirname, '..','views','amenities.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const getAmenities = async (req = request , res = response)=>{
    try {
        const amenitiesData = await amenities.findAll({
            attributes:['amenity_id', 'amenity_name', 'rent_cost', 'start_time', 'end_time', 'additional_cost_per_hour','nickName']
        })
        const amenitiesFormated = amenitiesData.map(amenity => {
            const starHour = amenity.start_time; // Asume que 'horaInicio' es el nombre de tu columna
            const endHour = amenity.end_time; // Asume que 'horaInicio' es el nombre de tu columna
              
            // Verifica si la starHour tiene un valor antes de intentar formatear
             const formatStartHour = starHour ?formatHour(starHour) : null;
             const formatEndHour =endHour ?formatHour(endHour) : null;
              
            return {
              ...amenity.get(),
              formatStartHour,
              formatEndHour
            };
          });
          
        return  res.render(amenitiesHTML,{
            amenitiesData:amenitiesFormated,
            BASE_URL:process.env.BASE_URL,
            ok:false,
            user_type:req.user_type
        });
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
} 

const updateAmenityData = async (req = request , res = response)=>{
    const amenity_id = req.params.amenity_id
    try {
        const updatedAmenityData =  await updateData(amenities,req.body,amenity_id,'amenity_id');
        return res.status(200).json({
            msg:'Se ha actualizado La amenidad',
            updatedData : req.body,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports ={
    getAmenities,
    updateAmenityData,
}




