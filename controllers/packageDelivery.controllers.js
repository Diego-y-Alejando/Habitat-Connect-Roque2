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
    changeObjectNames
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
                data_name:dataValues.resident_name,
                company_name:dataValues.company_name,
                data_state:dataValues.package_delivery_state
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
    const searchData = req.query.searchData ? req.query.searchData :''
    const dateForSearch = req.query.date ?req.query.date: getCurrentDateAndTime('yyyy-MM-dd')
    const upCommingVisits = req.query.upCommingVisits? req.query.upCommingVisits :1
    const packages_recieved = req.query.packages_recieved? req.query.packages_recieved:0
    try {
        const result = await getAllPackageDeliveryService(page,'resident-request',req.resident_id,dateForSearch,searchData,packages_recieved,['package_delivery_id','company_name','delivery_date','package_delivery_state'],upCommingVisits)
        const totalPages = Math.ceil(result.count/10)
        if (result.rows.length===0) {
            return res.status(200).json({
                msg:'Ya no hay mas paquetes',
                lastPage:page,
                allRows:[],
                ok:true,
                totalPages:totalPages
            })
        }  
        const newRows =result.rows.map(({dataValues}) => {         
            let newObject ={
                ...dataValues,
            }
           
            return changeObjectNames(newObject,{
                package_delivery_id:'visit_id',
                company_name:'company_name',
                package_delivery_state:'data_state',
                delivery_date:'data_date'
            });
        });
        
        return res.status(200).json({
            allRows:newRows,
            count:result.count,
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
            msg:updatedPackageDelivery,
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
       const packageDelivery = await getPackageDeliveryInfoService(req.resident_id,package_id,['resident_name','company_name','delivery_date'])
        return res.status(200).json({
            ok:true,
            data:packageDelivery
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