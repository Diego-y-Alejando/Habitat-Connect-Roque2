const amenities = require('../models/amenities.model')
const {
    formatHour
}= require('../helpers/helpers')
const getAmenitiesListService = async ()=>{
    try {
        const amenitiesData = await amenities.findAll({
            attributes:['amenity_id', 'amenity_name', 'rent_cost', 'start_time', 'end_time','time_limit','additional_cost_per_hour','nickName']
        })
        return  amenitiesData.map(amenity => {
            const startHour = amenity.start_time; // Asume que 'horaInicio' es el nombre de tu columna
            const endHour = amenity.end_time; // Asume que 'horaInicio' es el nombre de tu columna
              
            // Verifica si la startHour tiene un valor antes de intentar formatear
             const formatStartHour = startHour ?formatHour(startHour) : null;
             const formatEndHour =endHour ?formatHour(endHour) : null;
            
            return {
              ...amenity.get(),
              formatStartHour,
              formatEndHour
            };
          });
    } catch (error) {
        throw error
    }
}
const getAmenityDetailService =async(amenity_id,columns)=>{
    try {
        const amenity = await amenities.findOne({
            where:{
                amenity_id:amenity_id
            },
            attributes:columns
        })
        return amenity.get()
    } catch (error) {
        throw error
    }
}
const updateAmenityService = async(objectToEdit, amenity_id)=>{
    try {
        const amenityUpdated = await amenities.update(objectToEdit,{
            where:{
                amenity_id:amenity_id
            }
        }) 
        if (amenityUpdated<1) throw new Error('No se ha podido actualizar')
        return 'Se ha actualizado la amenidad '
    }catch(error) {
        throw error
    }
}

const getAmenityDataForBookingValidations =async(amenity_id)=>{
    try {
        const {dataValues}= await amenities.findOne({
            where:{
                amenity_id:amenity_id
            },
            attributes:['free_hours','time_limit','start_time','end_time', 'number_of_hours_opened','rent_cost','is_disabled']
        });
        return {
            free_hours:dataValues.free_hours,
            time_limit:dataValues.time_limit,
            start_time:dataValues.start_time,
            end_time:dataValues.end_time,
            rent_cost:dataValues.rent_cost,
            hours_opened:dataValues.number_of_hours_opened,
            is_disabled:dataValues.is_disabled
        }
    } catch (error) {
        throw error
    }
}
module.exports ={
    getAmenitiesListService,
    getAmenityDetailService,
    updateAmenityService,
    getAmenityDataForBookingValidations
}