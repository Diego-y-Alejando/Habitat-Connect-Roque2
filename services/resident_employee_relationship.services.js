const resident_employee_relationships= require('../models/resident_employee_relationships.model')
const {Op}= require('sequelize')
const createRelationshipService = async(maid_id,resident_id,dataToInsert)=>{
    const {boss_phone_number_1,boss_phone_number_2}= dataToInsert
    try {
        const [data,created]= await resident_employee_relationships.findOrCreate({
            where:{
                boss_phone_number_1:boss_phone_number_1,
                id_resident_boss:{
                    [Op.not]:resident_id
                }
            },
            defaults:{
                id_employe_of_resident:maid_id,
                id_resident_boss:resident_id,
                boss_phone_number_2 :boss_phone_number_2 || null
            }
        })
        if (!created) throw new Error('Ya existe un registro con el teléfono del encargado principal');

        return data
        
    } catch (error) {
        throw error.message
    }
}
const getRelationshipDetailsService = async(maid_id,resident_id)=>{
    try {
        const details = await resident_employee_relationships.findOne({
            where:{
                id_employe_of_resident:maid_id,
                id_resident_boss:resident_id
            },
            attributes:['relationship_id','boss_phone_number_1','boss_phone_number_2']
        })
        if (!details) throw new Error('No existe una relacion con estos id')
        const {dataValues}= details
        return dataValues
    } catch (error) {
        throw error
    }
}
const updateBossPhoneNumberService = async (maid_id, resident_id,dataToEdit)=>{
    try {
        const [updatedInfo] = await resident_employee_relationships.update(dataToEdit,{
            where:{
                id_employe_of_resident:maid_id,
                id_resident_boss:resident_id
            }
        })
        if (updatedInfo<=0)throw new Error('No se actualizaron los datos');
        return 'Se han actualizado los datos'
    } catch (error) {
        throw error.message
    }
}

const endRelationshipService = async(maid_id,resident_id)=>{
    try {
        
    } catch (error) {
        throw error
    }
}
module.exports={
    createRelationshipService,
    getRelationshipDetailsService,
    updateBossPhoneNumberService,
    endRelationshipService
}