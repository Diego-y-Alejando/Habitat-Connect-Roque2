const admin_users = require('../models/admin_users')


const getAdminIdService =async(user_id)=>{
    try {
        const result = await admin_users.findOne({
            where:{
                id_admin_user:user_id
            },
            attributes:['admin_user_id']
        })
        if (!result) throw new Error('El usuario solicitado no es un administrador')
        const {dataValues}= result
        return dataValues.admin_user_id
        
    } catch (error) {
        throw error
    }

}
module.exports ={
    getAdminIdService
}