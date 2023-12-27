const {request , response}=require('express');
const {
    updateData
}= require('../helpers/helpers')
const maintenance_record = require('../models/maintenance_record.model')
const getMaintenanceApartament =async(req = request, res = response)=>{
    const apartament_id = req.query.apartament_id
    const current_year = req.query.current_year
    try {
        const maintenanceData = await maintenance_record.findAll({
            where:{
                id_apartament_maintenance:apartament_id,
                current_year:current_year
            },
            attributes:['january','february','march','april','june','juli','august','september','october','november','december']
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
    const apartament_id = req.params.apartament_id
    const {year,month,paid_status,date_paid}=req.body
    try {

        const updateData = await maintenance_record.update({
            [month]:{
                paid_status:paid_status,
                date_paid:date_paid
            }
        },{
            where:{
                current_year:year,
                id_apartament_maintenance:apartament_id
            }
        })

            return res.status(200).json({
            msg:updateData,
            ok:true
        })
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


