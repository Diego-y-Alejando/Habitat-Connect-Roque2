const resident_users = require('../models/resident_users.model')
const users = require('../models/users.model');
const {Sequelize,Op}=require('sequelize')
const getResidentIdService =async(user_id)=>{
    try {
        const result = await resident_users.findOne({
            where:{
                id_resident_user:user_id
            },
            attributes:['resident_user_id']
        })
        if (!result) throw new Error('El usuario solicitado no es un residente')
        const {dataValues}= result
        return dataValues.resident_user_id
    } catch (error) {
        throw error
    }

}
const createResidentService = async (user_id,transaction)=>{
    try {
        const [resident,created]= await resident_users.findOrCreate({
            where:{
                id_resident_user:user_id
            },
            transaction:transaction
        })
        if (!created)throw new Error('Ya existe un residente con ese id')
        return resident.resident_user_id
    } catch (error) {
        throw error
    }
}
const getMyResidentUserInfoService =async (resident_id)=>{
    try {
        const residentUserInfo =await resident_users.findOne({
            where:{
                resident_user_id:resident_id
            },
            attributes:['id_resident_user'],
            include :[
                {
                    model:users,
                    as:'residentHaveUserInfo',
                    where:{
                        user_id:Sequelize.col('id_resident_user')
                    },
                    attributes:['name','lastname','phone_number']
                }
            ]
        })
        if (!residentUserInfo) throw new Error('No existe informacion del usuario correspondiente ')
        const {dataValues}= residentUserInfo
        return dataValues
    } catch (error) {
        throw error
    }
}
const getUserInfoIdOfResidentService =async (resident_id)=>{
    try {
        const user = await resident_users.findOne({
            where:{
                resident_user_id :resident_id
            },
            attributes:['id_resident_user']
        })
        if (!user)throw new Error('No existe un residente con ese id')
        const {dataValues}= user
        return dataValues.id_resident_user
    } catch (error) {
        throw error
    }
}
module.exports ={
    getResidentIdService,
    createResidentService,
    getMyResidentUserInfoService,
    getUserInfoIdOfResidentService
}