const {response, request}= require('express')

const {
    createPackageDeliveryService,
    checkPackageDeliveryService,
    getAllPackageDeliveryService,
    searchPackageDeliveryService,
    undoCheckPackageDeliveryService,
    getPackageDeliveryInfoService,
    updatePackageDeliveryService,
    cancelPackageDeliveryService,
    undoCancelPackageDeliveryService
}= require('../services/packageDelivery.services')
const {
    getCurrentDateAndTime,
    changeObjectNames,
    getDayWithDate
}= require('../helpers/helpers');
const createPackageDeliveryController = async (req = request , res = response)=>{
    const {resident_name,company_name,delivery_date}=req.body
    
    try {
        
      const {dataValues} = await createPackageDeliveryService({
        'resident_name':resident_name,
        'company_name':company_name,
        'delivery_date':delivery_date,
        'id_delivery_creator':req.resident_id,
        'package_delivery_state':'0',
        'cancel_state':1
      })
      return res.status(200).json({
            ok:true,
            msg:'Has creado el paquete',
            packageDeliveryData:{
                visit_id:dataValues.package_delivery_id,
                company_name:dataValues.company_name,
                package_state:dataValues.package_delivery_state,
                cancel_state:1,
                delivery_date: delivery_date
            }
      })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const checkPackageDeliveryController = async (req = request , res = response)=>{

    const {delivery_id,delivery_status} = req.body
    try {
        if (delivery_status>1) {
            throw new Error('Ya se ha recibido este paquete ')
        }
        const dateTime = getCurrentDateAndTime()
        const newPackageDeliveryStatus = await checkPackageDeliveryService(delivery_id,{
            'package_delivery_state':delivery_status,
            'delivery_time':dateTime,
            'id_package_recipient':req.id_receptor
        })
        if (newPackageDeliveryStatus<1) {
            throw new Error('Error al marcar el paquete como recibido ')
        }
        return res.status(200).json({
            ok:true,
            newStatus:delivery_status,
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const getAllPackageDeliveryForResidentsController = async (req = request , res = response)=>{
    const page = parseInt(req.query.page)
    const searchData = req.query.searchData || ''
    const packageFilter = req.query.packageFilter
    try {
        const {packageList,totalPages,currentPage,count} = await getAllPackageDeliveryService(page,'resident',req.resident_id,searchData,['package_delivery_id','company_name','delivery_date','package_delivery_state','cancel_state'],packageFilter)
       
        if (totalPages===0) {
            return res.status(200).json({
                msg:'No tienes paquetes registrados',
                'package-deliveries':[],
                ok:true,
                totalPages
            }) 
        }else if ( currentPage === totalPages){
            return res.status(200).json({
                'package-deliveries':packageList,
                msg:'No tienes más paquetes',
                ok:true,
                count:count,
                currentPage:page,
                totalPages

            });
        }
        return res.status(200).json({
            'package-deliveries':packageList,
            count:count,
            currentPage:page,
            totalPages:totalPages,
            ok:true
        })
      
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}


const undoCheckPackageDeliveryController = async (req = request , res = response)=>{
    const {visit_id,prevState}= req.body
    try {
        const undoCheckPackageDelivery = await undoCheckPackageDeliveryService(visit_id)
        console.log(undoCheckPackageDelivery);
        if (undoCheckPackageDelivery<1) {
            throw new Error('No se ha podido deshacer la acción');
        }
        return res.status(200).json({
            ok:true,
            msg:'Haz deshecho la última accion ',
            prevState:prevState
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const editPackageDeliveryController =async (req = request, res = response)=>{
    const package_id = req.params.visit_id
    try {
        const updatedPackageDelivery = await updatePackageDeliveryService(package_id,req.body)
        return res.status(200).json({
            msg:'Has editado tu paquete',
            packageUpdated:{visit_id:package_id,...updatedPackageDelivery},
            ok:true
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}

const getPackageDeliveryInfoController =async (req = request, res = response)=>{
    const package_id = req.params.visit_id
    try {
       const packageDelivery = await getPackageDeliveryInfoService(req.resident_id,package_id,['resident_name'])
        return res.status(200).json({
            ok:true,
            packageData:packageDelivery
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const cancelPackageDeliveryController=async(req = request , res = response)=>{
    const package_id = req.params.visit_id
    try {
        const cancelResult = await cancelPackageDeliveryService(package_id,req.resident_id);
        return res.status(200).json({
            msg:cancelResult,
            cancel_state:0,
            ok:true
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const  undoCancelPackageDeliveryController = async (req = request , res = response)=>{
    const package_id = req.params.visit_id
    try {
        const undoCancelResult = await undoCancelPackageDeliveryService(package_id,req.resident_id)

        return res.status(200).json({
            msg:undoCancelResult,
            ok:true
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
} 
module.exports= {
    createPackageDeliveryController,
    checkPackageDeliveryController,
    getAllPackageDeliveryForResidentsController,
    undoCheckPackageDeliveryController,
    editPackageDeliveryController,
    getPackageDeliveryInfoController,
    cancelPackageDeliveryController,
    undoCancelPackageDeliveryController

}