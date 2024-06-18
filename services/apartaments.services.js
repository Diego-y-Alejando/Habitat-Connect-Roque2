
const features_apartaments = require('../models/features_apartament.model')
const apartaments = require('../models/apartaments.model');
const users = require('../models/users.model')
const resident_users = require('../models/resident_users.model')
const residentDesignatedForApartment =async (apartament_id,info,transaction)=>{
    try {
        await apartaments.update(info,{
            where:{
                apartament_id:apartament_id
            },
            transaction:transaction
        })
    } catch (error) {
        throw error
    }
}
const getApartamentsListService =async(level)=>{
    try {
        return await apartaments.findAll({
            where:{ 
                apartament_level:level 
            }, 
            attributes:['apartament_id','apartament_number','apartament_name'],
            include: [
                {
                  model: features_apartaments, // Modelo asociado (por ejemplo, PostModel)
                  as:'apartamentFeatures',
                  attributes: ['area'] ,// Columnas que deseas recuperar del modelo asociado
                  foreignKey: 'id_features_apartament'
                },{
                    model:resident_users,
                    as:'apartamentHaveResident',
                    attributes:['id_resident_user'],
                    foreignKey:'id_resident_apartament ',
                    include:[
                        {
                            model:users,
                            as:'residentHaveUserInfo',
                            attributes:['phone_number']
                        }
                    ]
                }
              ]
        });
    } catch (error) {
        throw error
    }
}
const getApartamentDetailService =async(apartament_id)=>{
    try {
        return await apartaments.findOne({
            where:{
                apartament_id:apartament_id
            },
            include: [
                {
                  model: features_apartaments, // Modelo asociado (por ejemplo, PostModel)
                  as:'apartamentFeatures',
                  attributes: ['area','maintenance_fee','late_fee'] ,// Columnas que deseas recuperar del modelo asociado
                  foreignKey: 'id_features_apartament'
                },
            ]

        })
    } catch (error) {
        
    }
}
const getResidentAndLandlordService = async (apartament_id)=>{
    try {
        
        return await apartaments.findOne({
            where:{
                apartament_id:apartament_id
            },
            attributes: ['apartament_id'],
            include:[
                {
                    model:resident_users,
                    as:'apartamentHaveResident',
                    attributes: ['id_resident_user'] ,// Columnas que deseas recuperar del modelo asociado
                    foreignKey: 'id_resident_apartament',
                    include:[
                        {
                            model:users,
                            as:'residentHaveUserInfo',
                            attributes:['name','lastname','email'],
                            foreignKey:'id_resident_user'
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        throw error
    }
}

const updateApartamentNameService = async (objectToEdit,apartament_id)=>{
    try {
        const isUpdated = await apartaments.update(objectToEdit,{
            where:{
                apartament_id:apartament_id
            }
        })
        if (isUpdated>0) {
            return 'Se ha actualizado el nombre del apartamento'
        }else{
            throw new Error('No se pudo actualizar el nombre del apto')
        }
    } catch (error) {
        throw error
    }
}
module.exports ={
    residentDesignatedForApartment,
    getApartamentsListService,
    getApartamentDetailService,
    getResidentAndLandlordService,
    updateApartamentNameService
    
}