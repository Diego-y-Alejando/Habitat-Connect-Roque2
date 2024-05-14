const package_delivery= require('../../models/packageDelivery.model');
const apartament = require('../../models/apartament.model')
const {Sequelize,Op}=require('sequelize')
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
const getAllPackageDeliveryService =async (page,searchData)=>{
    
    try {
        const whereForSearch ={
            [Op.or]: [
                { resident_name: { [Op.like]: `%${searchData}%` } }, 
                { company_name: { [Op.like]: `%${searchData}%` } } 
            ]
        }
        const offset = (page - 1) * 10;
        return  await package_delivery.findAndCountAll({
            attributes: ['package_delivery_id', 'resident_name', 'company_name',  'package_delivery_state' ],
            offset,
            limit: 10,
            where: searchData? whereForSearch :{},
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
module.exports={
    createPackageDeliveryService,
    checkPackageDeliveryService,
    getAllPackageDeliveryService,
    searchPackageDeliveryService,
    undoCheckPackageDeliveryService
}