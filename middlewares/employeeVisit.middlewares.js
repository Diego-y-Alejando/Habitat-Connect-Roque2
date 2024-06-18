const {response, request}= require('express')


const createEmployeeVisitValidations = async (req = request , res = response , next)=>{
    try {
        
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const checkEmployeeVisitValidations = async (req = request , res = response , next)=>{
    try {
        
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const getEmployeeVisitsValidations = async (req = request , res = response , next)=>{
    try {
        
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const searchEmployeeVisitValidations = async (req = request , res = response , next)=>{
    try {
        
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const undoCheckEmployeeVisitValidations = async (req = request , res = response , next)=>{
    try {
        
        next();
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}



module.exports ={
    createEmployeeVisitValidations,
    checkEmployeeVisitValidations,
    getEmployeeVisitsValidations,
    searchEmployeeVisitValidations,
    undoCheckEmployeeVisitValidations
}