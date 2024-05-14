const {response, request}= require('express')

const {
    createPackageDeliveryService,
    checkPackageDeliveryService,
    getAllPackageDeliveryService,
    searchPackageDeliveryService,
    undoCheckPackageDeliveryService
}= require('../../services/securityServices/packageDelivery.services')
const {
    formatDateAndHour,
    changeObjectNames
}= require('../../helpers/helpers');
const createPackageDeliveryController = async (req = request , res = response)=>{
    const {resident_name,company_name,apartament_id}=req.body
    
    try {
        
      const {dataValues} = await createPackageDeliveryService({
        'resident_name':resident_name,
        'company_name':company_name,
        'id_delivery_creator':req.id_creator,
        'id_apartament_package':apartament_id,
        'package_delivery_state':'0'
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
        const dateTime = formatDateAndHour()
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
const getAllPackageDeliveryController = async (req = request , res = response)=>{
    const page=parseInt(req.query.page)
    const searchData = req.query.searchData

    try {
        const result = await getAllPackageDeliveryService(page,searchData)
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
                'data_apartament_number':dataValues['packageForApartament'].apartament_number
            }
            delete newObject['packageForApartament']
            return changeObjectNames(newObject,{
                package_delivery_id:'visit_id',
                resident_name:'data_name',
                company_name:'company_name',
                package_delivery_state:'data_state',
                data_apartament_number:'data_apartament_number'
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

const searchPackageDeliveryController = async (req = request , res = response)=>{
    const searchData = req.query.searchData
    try {
        const packageDeliverySearched = await searchPackageDeliveryService(searchData);
        return res.status(200).json({
            searchedResult:packageDeliverySearched,
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
module.exports= {
    createPackageDeliveryController,
    checkPackageDeliveryController,
    getAllPackageDeliveryController,
    searchPackageDeliveryController,
    undoCheckPackageDeliveryController

}