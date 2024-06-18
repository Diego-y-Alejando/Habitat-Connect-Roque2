const resident_employee_schedule = require('../models/resident_employee_schedule.model');
const resident_employee_relationships = require('../models/resident_employee_relationships.model')
const createScheduleService = async(data)=>{
    const {days_list,month_list,relationship_id}=data
    try {
        const [schedule,created]= await resident_employee_schedule.findOrCreate({
            where:{
                id_relationship_schedule:relationship_id
            },
            defaults:{
                days_list,
                month_list
            }
        })
        if (!created) throw new Error('No se pudo crear el horario ')
        return {
            msg:"Se ha creado el horario",
            schedule
        } 
    } catch (error) {
        throw error.message
    }
}
const getScheduleService = async(relationship_id)=>{
    try {
        const schedule = await resident_employee_schedule.findOne({
            where:{
                id_relationship_schedule:relationship_id
            },
            attributes:['days_list','month_list']
        })
        if (!schedule) throw new Error('El horario no existe');
        return {
            schedule:schedule.get()
        }
    } catch (error) {
        throw error.message
    }
}
const editScheduleService = async(relationship_id,dataToEdit)=>{
    try {
        const [isUpdated] = await resident_employee_schedule.update(dataToEdit,{
            where:{
                id_relationship_schedule:relationship_id
            }
        })
        if (isUpdated<=0) throw new Error('No se pudo actualizar el horario')
        
        return dataToEdit
    } catch (error) {
        throw error.message
    }
}

module.exports ={
    createScheduleService,
    getScheduleService,
    editScheduleService
}