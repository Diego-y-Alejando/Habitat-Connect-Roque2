const {response , request}= require('express')

const providers = require('../models/providers.model')
const {
    updateData
}=require('../helpers/helpers')
const createProvider= async (req = request , res = response )=>{
    const {
        provider_name, 
        phone_number, 
        bank_account, 
        bank_name, 
        type_account, 
        payment_methods, 
        service_description
    }= req.body
    try{
        const [provider,create]= await providers.findOrCreate({
            where:{
                phone_number:phone_number,
                bank_account:bank_account
            },
            defaults:{
                provider_name, 
                bank_name, 
                type_account, 
                payment_methods, 
                service_description
            }
        })
        if (!create) {
            throw new Error('Revisa el teléfono o el número de cuenta , no pueden existir duplicados')
        }else{
            
            return res.status(200).json({
                msg:'Se ha creado el proveedor',
                data:{
                    'provider_name':provider.provider_name,
                    'provider_id':provider.provider_id,
                    'bank_name':provider.bank_name,
                    'type_account':provider.type_account,
                    'phone_number':provider.phone_number,
                    'bank_account':provider.bank_account
                    
                },
                ok:true
            })
        }
      
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getProvidersData= async (req = request , res = response )=>{
    const page=parseInt(req.query.page)
    try {
        const offset = (page - 1) * 10;
        const result = await providers.findAndCountAll({
            attributes: ['provider_id', 'provider_name', 'phone_number','bank_account','bank_name','type_account'],
            offset,
            limit: 10,
            order: [['provider_id', 'DESC']]
        });
        if (result.rows.length===0) {
            return res.status(200).json({
                msg:'Ya no hay mas proveedores',
                lastPage:page,
                ok:true
            })
        }
        return res.status(200).json({
            providers:result,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

const getProviderData =async (req = request , res = response )=>{
    const provider_id = req.params.provider_id
    try {
        const provider = await providers.findOne({
            where:{
                provider_id:provider_id
            }
        })
        return res.status(200).json({
            provider,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateProvider = async (req = request , res = response )=>{
    const provider_id=req.params.provider_id
    try {
        const updateProvider =await updateData(providers,req.body,provider_id,'provider_id')
        return res.status(200).json({
            updateProvider,
            updateData:req.body,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports={
    createProvider,
    getProvidersData,
    getProviderData,
    updateProvider,
}