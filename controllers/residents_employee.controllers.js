const {request , response }= require('express')
const {
    createEmployeForResidentsService,
    getResidentsEmployeeService,
    getResidentEmployeeDetailService,
    getMyEmployeesService
}= require('../services/residents_employee.services')
const createEmployeeForResidentsController =async (req = request , res = response)=>{
    try {
        const {msg,data} = await createEmployeForResidentsService (req.body)
        return res.status(200).json({
            msg,
            data,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
const getResidentsEmployeesController = async (req= request , res = response)=>{
    const page = req.query.page
    try {
        const {employeesList,totalPages,currentPage,count} = await getResidentsEmployeeService(page)
        return res.status(200).json({
            employeesList,
            totalPages,
            currentPage,
            count,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
const getResidentEmployeeDetailControllers =async (req = request , res = response)=>{
    const maid_id = req.params.maid_id
    try {
        const maid_info = await getResidentEmployeeDetailService(maid_id, ['maid_id','name','lastname','phone_number','dpi','occupation_list']);
        return res.status(200).json({
            maid_info,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error,
            ok:false
        })
    }
}
const getMyEmployeeListController = async (req = request , res = response)=>{
    const page = req.query.page
    try {
  
        if (!req.resident_id) throw new Error('Tu id de residente no puede venir vacío');
        const myEmployees = await getMyEmployeesService(req.resident_id,page)
        return res.status(200).json({
            myEmployees,
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
    createEmployeeForResidentsController,
    getResidentsEmployeesController,
    getResidentEmployeeDetailControllers,
    getMyEmployeeListController
    
}