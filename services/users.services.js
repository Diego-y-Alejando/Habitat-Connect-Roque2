const users = require('../models/users.model');


const checkUserEmailExistAndReturnPasswordService =async (email)=>{
    try {
        const result  =await users.findOne({
            where:{
                email:email
            },
            attributes: ['user_id', 'user_type', 'password','name'],
        })
        if (!result) throw new Error('No existe el usuario')
        const {dataValues}=result
        return {
            'user_id':dataValues.user_id,
            'user_type':dataValues.user_type,
            'pass':dataValues.password,
            'name': dataValues.name
        }
    } catch (error) {
        throw error
    }

}
const createUserService = async(whereData,defaultsValues,transaction)=>{
    try {
        const [user,created]= await users.findOrCreate({
            where:whereData,
            defaults:defaultsValues,
            transaction:transaction
        })

        if (!created) throw new Error('El correo,teléfono y dpi deben ser únicos')
        return user
    } catch (error) {
        throw error  
    }
}
const updateUserInfoService =async(user_id,dataToEdit)=>{
    try {
        const updatedInfo = await users.update(dataToEdit,{
            where:{
                user_id:user_id
            }
        })
        if (updatedInfo<1) throw new Error('No se pudo actualizar tu información')
        return 'Se ha actualizado tu información '
    } catch (error) {
        throw error 
    }
}
module.exports= {
    checkUserEmailExistAndReturnPasswordService,
    createUserService,
    updateUserInfoService
}