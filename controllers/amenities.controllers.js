const {request , response} = require('express');

const {Sequelize} = require('sequelize')
const path = require('path');
const {
    getAmenitiesListService,
    updateAmenityService
}= require('../services/amenities.services');
const amenitiesHTML = path.join(__dirname, '..','views','amenities.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const getAmenitiesListController = async (req = request , res = response)=>{
    try {
        const amenitiesList = await getAmenitiesListService();
        return res.status(200).json({
            amenities:amenitiesList
        })
        // return  res.render(amenitiesHTML,{
        //     amenitiesData:amenitiesFormated,
        //     BASE_URL:process.env.BASE_URL,
        //     ok:false,
        //     user_type:req.user_type
        // });
    } catch (error) {
        return res.render(error404HTML,{
            error:error.message,
            ok:false
        })

    }
} 

const updateAmenityData = async (req = request , res = response)=>{
    const amenity_id = req.params.amenity_id
    try {
       const updateAmenity = await updateAmenityService(req.body,amenity_id)
       return res.status(200).json({
            msg:updateAmenity,
            ok:true
       })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const disableAmenityController = async (req = request , res = response)=>{
    const amenity_id =req.params.amenity_id
    try {
        const updateAmenity = await updateAmenityService({
            is_disabled:'0'
        },amenity_id)
        return res.status(200).json({
            msg:updateAmenity,
            ok:true
       })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const ableAmenityController = async (req = request , res = response)=>{
    const amenity_id= req.params.amenity_id
    try {
        const updateAmenity = await updateAmenityService({
            is_disabled:'1'
        },amenity_id)
        return res.status(200).json({
            msg:updateAmenity,
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
    getAmenitiesListController,
    updateAmenityData,
    disableAmenityController,
    ableAmenityController
}




