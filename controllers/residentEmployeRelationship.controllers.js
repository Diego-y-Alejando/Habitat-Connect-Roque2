const { request , response}=require('express');
const {
    createRelationshipService,
    getRelationshipDetailsService,
    updateBossPhoneNumberService,
    endRelationshipService,
    
}= require('../services/resident_employee_relationship.services')
const {
    deleteResidentEmployeeScheduleService
}= require('../services/resident_employee_schedule.services.js')
const {sequelizeObj} =require('../database/config')
const createRelationshipController= async(req = request , res = response )=>{
    const maid_id = req.params.maid_id

    try {
        const relationshipCreated = await createRelationshipService(maid_id,req.resident_id,req.body)
        return res.status(200).json({
            msg:'Has establecido una Relacion con el empleado',
            ok:true,
            relationshipCreated
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
const getRelationshipDetailsController = async(req = request , res = response)=>{
    const maid_id = req.params.maid_id
    try {
        if (!req.resident_id)throw new Error('No puede venir vacio tu id de residente') 
        const relationshipDetail = await getRelationshipDetailsService(maid_id,req.resident_id)
        return res.status(200).json({
            relationshipDetail,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
const updateBossPhoneNumberController = async(req = request , res = response)=>{
    const maid_id = req.params.maid_id
    try {
        const updatedInfo = await updateBossPhoneNumberService(maid_id,req.resident_id,req.body)
        return res.status(200).json({
            msg:updatedInfo,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}

const endRelationshipController = async( req = request , res = response)=>{
    const relationship_id = req.params.relationship_id

    try {
        
        const transactionResponse = await sequelizeObj.transaction(async endRelationshipTransaction=>{
        
            await endRelationshipService(relationship_id,endRelationshipTransaction)
            await deleteResidentEmployeeScheduleService(relationship_id,endRelationshipTransaction)
            // eliminar las visitas 
        });
        return res.status(200).json({
            msg:'Has terminado tu relacion con el empleado',
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:'false'
        })
    }
}
module.exports ={
    createRelationshipController,
    getRelationshipDetailsController,
    updateBossPhoneNumberController,
    endRelationshipController
}