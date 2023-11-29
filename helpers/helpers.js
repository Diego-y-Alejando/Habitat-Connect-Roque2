// Generación de tokens
const jwt = require('jsonwebtoken');
const jwtGenerate =(id,user_type,secret)=>{
    return new Promise((resolve,reject)=>{
        const payload ={id,user_type}
        jwt.sign(payload,secret,{
            expiresIn:'4h'
        },(err,token)=>{
            if (err) {
                reject("no se pudo generar el token")
            }else{
                resolve(token)
            }
        })
    })
}
// HASEANDO LA CONTRASEÑA 
const bcrypt = require('bcrypt');
const hashingPassword = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}
const updateData = async(model,objectToEdit,searchField, targetField)=>{

    try {
        const update = await model.update(objectToEdit,{
            where:{
                [targetField]:searchField
            }
        });      
        if (update>0) {
            return 'Se han actualizado los datos '
        }else{
            throw new Error('No se han podido actualizar los datos')
        }
    } catch (error) {
        throw new Error(error)
    }
 
}
const findData=async(model, searchField, targetField, excludeArr)=>{
    
    try {
        const foundData= await model.findOne({
            where:{
                [targetField]:searchField
            },
            attributes:{
                exclude:excludeArr
            }
        })
        if (!foundData) {
           return null
        }else{
            return foundData.dataValues
        }
    } catch (error) {
        throw new Error(error);
    }
}
// const findAllData = async(model , searchField,targetField,includeAttributes)=>{
//     try {
//         const findAll =  await 
//     } catch (error) {
//         throw new Error(error)
//     }
// }
module.exports={
        jwtGenerate,
        hashingPassword,
        updateData,
        findData,
}