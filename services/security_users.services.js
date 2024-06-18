const security_users = require('../models/security_users.model')


const getSecurityIdService =async(user_id)=>{
    try {
        const result = await security_users.findOne({
            where:{
                id_security_user:user_id
            },
            attributes:['security_user_id']
        })
        if (!result) throw new Error('El usuario solicitado no es un usuario de seguridad')
        const {dataValues}= result
        return dataValues.security_user_id
        
    } catch (error) {
        throw error
    }

}
module.exports ={
    getSecurityIdService
}