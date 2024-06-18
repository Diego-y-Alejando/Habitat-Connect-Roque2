const package_delivery= require('../models/packageDelivery.model');

const {Sequelize,Op}=require('sequelize')
const {
    getCurrentDateAndTime
}= require('../helpers/helpers')
const createPackageDeliveryService = async (packaDeliveryData)=>{
    try {
      return await package_delivery.create(packaDeliveryData)
    } catch (error) {
      throw error
    }
}
const checkPackageDeliveryService =async(delivery_id,checkPackageData)=>{
    try {
        
        return await package_delivery.update(checkPackageData,{
            where:{
                package_delivery_id:delivery_id
            }
        });
    } catch (error) {
        throw error
    }
}
const getAllPackageDeliveryService =async (page,user_request,resident_id,dateForSearch,searchData,packages_recieved,columns,upCommingVisits)=>{
    
    try {
        let whereObj={}
        if (user_request ='resident_request') {
            if (upCommingVisits==='2') {
                whereObj= {
                    id_delivery_creator:resident_id,
                    delivery_date:{
                       [Op.gte] :dateForSearch
                    },
                    [Op.or]: [
                        { company_name: { [Op.like]: `%${searchData}%` } }
                    ],
                    package_delivery_state:packages_recieved
                }
            }else{
                whereObj= {
                    id_delivery_creator:resident_id,
                    delivery_date:dateForSearch,
                    [Op.or]: [
                        { company_name: { [Op.like]: `%${searchData}%` } }
                    ],
                    package_delivery_state:packages_recieved
                }  
            }
        }
        const offset = (page - 1) * 10;
        return  await package_delivery.findAndCountAll({
            attributes:columns,
            offset,
            limit: 10,
            where: whereObj,
            order: [['package_delivery_id', 'DESC']],
        });
    } catch (error) {
        throw error
    }
}
const searchPackageDeliveryService =async(searchData)=>{
    try {
        return  await package_delivery.findAll({
            where: {
              [Op.or]: [
                {resident_name: { [Op.like]: `%${searchData}%` } }, 
                {company_name: { [Op.like]: `%${searchData}%` }}
              ]
            },
            attributes: ['package_delivery_id', 'resident_name', 'company_name',  'package_delivery_state' ],
            order: [['package_delivery_id', 'DESC']],
            include:[{
                model:apartament,
                as:'packageForApartament',
                where:{
                    apartament_id:Sequelize.col('id_apartament_package')
                },
                attributes:['apartament_number']
            }]
        });
    } catch (error) {
        throw error
    }
}
const undoCheckPackageDeliveryService=async(delivery_id)=>{
    try {
        return await package_delivery.update({
            package_delivery_state:'0',
            delivery_time:null,
            id_package_recipient:null
        },{
            where:{
                package_delivery_id:delivery_id
            }
        });
    } catch (error) {
        throw error
    }
}
const getPackageDeliveryInfoService =async(resident_id,package_id,columns)=>{
    try {
        const data= await package_delivery.findOne({
            where:{
                package_delivery_id:package_id,
                id_delivery_creator:resident_id,
                delivery_date:{
                    [Op.gte]:getCurrentDateAndTime('yyyy-MM-dd')
                },
                cancel_state:1
            },
            attributes:columns
        })
        if (!data) {
            throw new Error('No existe ese paquete');
        }
        const {dataValues}= data
        return dataValues
    } catch (error) {
        throw error
    }
}
const updatePackageDeliveryService =async(package_id,dataToEdit)=>{
    try {
        const updatedDelivery = await package_delivery.update(dataToEdit,{
            where:{
                package_delivery_id:package_id,
                delivery_date:{
                    [Op.gte]:getCurrentDateAndTime('yyyy-MM-dd')
                },
                cancel_state:1
            }
        })
        if (updatedDelivery<=0) throw new Error('No se pudo modificar el paquete')
        return 'Has editado el paquete'
    } catch (error) {
        throw error
    }
}
const cancelPackageDeliveryService  = async (package_id,resident_id)=>{
    try {
        const [cancelResult] =await package_delivery.update({
            cancel_state:0
        },{
            where:{
                id_delivery_creator:resident_id,
                package_delivery_id:package_id
            }
        });
        if (cancelResult<=0) throw new Error('No se pudo cancelar el paquete')
        return 'Has cancelado tu paquete '
    } catch (error) {
        throw error
    }
}
const undoCancelPackageDeliveryService = async (package_id,resident_id)=>{
    try {
        const [undoResult] =await package_delivery.update({
            cancel_state:1
        },{
            where:{
                id_delivery_creator: resident_id,
                package_delivery_id:package_id
            }
        })
        console.log('ESTE ES UNDORESULT',undoResult);
        if (undoResult<=0) throw new Error('No se ha podido deshacer la cancelación')
            
        return 'Has deshecho la acción'
    } catch (error) {
        throw error
    }
}
module.exports={
    createPackageDeliveryService,
    checkPackageDeliveryService,
    getAllPackageDeliveryService,
    searchPackageDeliveryService,
    undoCheckPackageDeliveryService,
    getPackageDeliveryInfoService,
    updatePackageDeliveryService,
    cancelPackageDeliveryService,
    undoCancelPackageDeliveryService
}