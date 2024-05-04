const {response, request}= require('express')


const createEmployeeVisitController = async (req = request , res = response )=>{
    try {
        
      
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const checkEmployeeVisitsController = async (req = request , res = response )=>{
    try {
        
      
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const getEmployeeVisitsController = async (req = request , res = response )=>{
    try {
        
      
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const searchEmployeeVisitController = async (req = request , res = response )=>{
    try {
        
      
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const undoCheckEmployeeVisitController = async (req = request , res = response )=>{
    try {
        
      
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports={
    createEmployeeVisitController,
    checkEmployeeVisitsController,
    getEmployeeVisitsController,
    searchEmployeeVisitController,
    undoCheckEmployeeVisitController
}