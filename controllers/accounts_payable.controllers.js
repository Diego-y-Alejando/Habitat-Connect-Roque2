const {response, request}= require('express')
const accounts_payable = require('../models/account_payable.model')
const providers = require('../models/providers.model')
const {Sequelize}=require('sequelize')
const {
    updateData
}= require('../helpers/helpers')
const createAccountPayable = async(req = request , res = response)=>{
    const {
        invoice_id,
        invoice_date, 
        concept, 
        amount, 
        number_of_transaction, 
        paid, 
        id_bank_account, 
        id_provider_account
    }= req.body
    // bankAccountAccountId
    try {
        const [booking,created]= await accounts_payable.findOrCreate({
            where:{
                invoice_id:invoice_id
            },
            defaults:{
                invoice_date:invoice_date,
                concept:concept,
                amount:amount,
                number_of_transaction:number_of_transaction,
                paid:paid,
                id_bank_account:id_bank_account,
                id_provider_account:id_provider_account
            }
        })
        if (!created) {
            throw new Error('No se pueden crear facturas con el mismo id')
        }else{
            return res.status(200).json({
                msg:'Cuenta por pagar creada',
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
const getAccountsPayable= async(req = request , res = response)=>{
    const page=parseInt(req.query.page)
    try {
        const offset = (page - 1) * 10;
        const result = await accounts_payable.findAndCountAll({
            attributes: ['invoice_id','invoice_date','amount','paid'],
            offset,
            limit: 10,
            order: [['account_id', 'DESC']],
            include:[{
                model:providers,
                as:'accountHaveProvider',
                where:{
                    provider_id:Sequelize.col('id_provider_account')
                },
                attributes:['provider_name']
            }]
        });
        return res.status(200).json({
            accountsPayableList:result,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getAccountPayable = async(req = request , res = response)=>{
    const account_id = req.params.account_id
    try {
        const account =await accounts_payable.findOne({
            where:{
                account_id:account_id
            },
            attributes:['account_id', 'invoice_id', 'invoice_date', 'concept', 'amount', 'number_of_transaction', 'paid', 'id_bank_account', 'id_provider_account']
        });
        return res.status(200).json({
            account:account,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateAccountPayable = async(req = request , res = response)=>{
    const account_id= req.params.account_id
    try {
        const updatedAccount = await updateData(accounts_payable,req.body,account_id,'account_id');
        return res.status(200).json({
            msg:updatedAccount,
            updatedData:req.body,
            ok:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const changeAccountPaidStatus = async(req = request , res = response)=>{
    const {
        paid,
        account_id
    }=req.body
    try {
        const updatedAccount = await updateData(accounts_payable,req.body,account_id,'account_id');
        return res.status(200).json({
            msg:'Has marcado como pagada la cuenta ',
            ok:true
        });
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports ={
    createAccountPayable,
    getAccountsPayable,
    getAccountPayable,
    updateAccountPayable,
    changeAccountPaidStatus,
}