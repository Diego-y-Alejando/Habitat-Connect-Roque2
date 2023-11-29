const {request , response}=require('express');
// const {
    
// }= require('../helpers/helpers')
const maintenance_apartament = require('../models/maintenance_record.model')
const getMaintenanceApartament =async(req = request, res = response)=>{
    const apartament_id = req.query.apartament_id
    const current_year = req.query.current_year

    try {
        const maintenanceData = await maintenance_apartament.findAll({
            where:{
                id_apartament_maintenance:apartament_id,
                current_year:current_year
            },
            attributes:['january','frebuary','march','april','june','juli','august','september','october','november','december']
        }); 
        return res.status(200).json({
            maintenanceData,
            ok:true
        })
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateMaintenance= async (req = request , res = response)=>{
    try {
        
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports= {
    getMaintenanceApartament,
    updateMaintenance
}


