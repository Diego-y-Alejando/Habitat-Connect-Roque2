const {request , response} = require('express');
const amenities = require('../models/amenities.model');
const {
    updateData
}= require('../helpers/helpers')
const getAmenities = async (req = request , res = response)=>{
    try {
        const amenitiesData = await amenities.findAll({
            attributes:['amenity_id', 'amenity_name', 'rent_cost', 'start_time', 'end_time', 'additional_cost_per_hour']
        })
        return res.status(200).json({
            amenitiesData,
            ok:true
        })
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
            message:updateAmenityData,
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




