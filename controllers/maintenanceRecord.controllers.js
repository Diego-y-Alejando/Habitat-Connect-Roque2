const {request , response}=require('express');
const {
    updateData,
    changeObjectNames
}= require('../helpers/helpers')
const maintenance_record = require('../models/maintenance_record.model')
const getMaintenanceApartament =async(req = request, res = response)=>{
    const apartament_id = req.query.apartament_id
    const current_year = req.query.current_year
    let newData
    try {
        console.log(current_year);
        const maintenanceData = await maintenance_record.findAll({
            where:{
                id_apartament_maintenance:apartament_id,
                current_year:current_year
            },
            attributes:['january','february','march','april','may','june','juli','august','september','october','november','december']
        }); 
        if (maintenanceData.length>0) {
            newData = changeObjectNames(maintenanceData[0].dataValues,{
                january: 'ENE',
                february: 'FEB',
                may:'MAY',
                march: 'MAR',
                april: 'ABR',
                june: 'JUN',
                juli: 'JUL',
                august: 'AGO',
                september: 'SEP',
                october: 'OCT',
                november: 'NOV',
                december: 'DIC',
            })
        }else{
            newData=[];
        }
        return res.status(200).json({
            maintenanceData:newData,
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
    const {year,month,date_paid}=req.body
    try {
        
        const updateData = await maintenance_record.update({
            [month]:{
                paid_status:req.paid,
                date_paid:date_paid
            }
        },{
            where:{
                current_year:year,
                id_apartament_maintenance:apartament_id
            }
        })

            return res.status(200).json({
            msg:req.msgLateFee,
            paid_status:req.paid,
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


