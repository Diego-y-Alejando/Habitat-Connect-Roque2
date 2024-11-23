const {request , response} = require('express');

const {Sequelize} = require('sequelize')
const path = require('path');
const {
    getAmenitiesListService,
    updateAmenityService,
    getAmenityDetailService
}= require('../services/amenities.services');
const amenitiesHTML = path.join(__dirname, '..','views','amenities.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const getAmenitiesListController = async (req = request , res = response)=>{
    try {
        const amenitiesList = await getAmenitiesListService();
        return res.status(200).json({
            amenities:amenitiesList,
            ok: true
        })
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

const getAmenityDetailController = async( req = request , res = response)=>{
    const amenity_name = req.params.amenity_name
    try {
        const amenity= await getAmenityDetailService(amenity_name,['amenity_id','rent_cost', 'start_time', 'end_time', 'free_hours', 'additional_cost_per_hour', 'time_limit', 'is_disabled'])
        return res.status(200).json({
            amenity:amenity,
            ok: true
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
    ableAmenityController,
    getAmenityDetailController
}




