const amenities = require('../models/amenities.model')
const {
    formatHour
}= require('../helpers/helpers')
const getAmenitiesListService = async ()=>{
    try {
        const amenitiesData = await amenities.findAll({
            attributes:['amenity_id', 'amenity_name', 'rent_cost', 'start_time', 'end_time','time_limit','free_hours']
        })
        return  amenitiesData.map(amenity => {
            const startHour = amenity.start_time;
            const endHour = amenity.end_time; 

            // Verifica si la startHour tiene un valor antes de intentar formatear
            const start_time = startHour ?formatHour(startHour) : null;
            const end_time =endHour ?formatHour(endHour) : null;
            delete amenity.get().start_time
            delete amenity.get().end_time
            return {
              ...amenity.get(),
              start_time,
              end_time
            };
          });
    } catch (error) {
        throw error
    }
}
const getAmenityDetailService =async(amenity_name,columns)=>{
    try {
        const amenity = await amenities.findOne({
            where:{
                amenity_name:amenity_name
            },
            attributes:columns
        })
        if(!amenity){
            throw new Error(`No existe la amenidad "${amenity_name}"`)
        }else{
            return amenity.get()

        }
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
            attributes:['free_hours','time_limit','start_time','end_time','rent_cost','is_disabled']
        });
        return {
            free_hours:dataValues.free_hours,
            time_limit:dataValues.time_limit,
            start_time:dataValues.start_time,
            end_time:dataValues.end_time,
            rent_cost:dataValues.rent_cost,
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