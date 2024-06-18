
const {request , response}= require('express')

const {
    createScheduleService,
    getScheduleService,
    editScheduleService
}= require('../services/resident_employee_schedule.services')
const createScheduleController = async (req = request , res = response)=>{
    try {
        const {msg,schedule} = await createScheduleService(req.body)
        return res.status(200).json({
            msg,
            schedule,
            ok:true
        })
    } catch (error) {
        
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
const getScheduleController = async (req = request , res = response)=>{
    const relationship_id = req.params.relationship_id
    try {
        const {schedule} = await getScheduleService(relationship_id);
        return res.status(200).json({
            schedule,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
const  editScheduleController = async (req = request , res = response)=>{
    const relationship_id = req.params.relationship_id
    try {
        const isUpdated = await editScheduleService(relationship_id,req.body)
        return res.status(200).json({
            msg:'Se ha actualizado el horario',
            schedule:req.body
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
module.exports = {
    createScheduleController,
    getScheduleController,
    editScheduleController
}
