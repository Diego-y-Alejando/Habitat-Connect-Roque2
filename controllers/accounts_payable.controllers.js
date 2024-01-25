const {response, request}= require('express')
const accounts_payable = require('../models/account_payable.model')
const providers = require('../models/providers.model')
const {Op ,Sequelize}=require('sequelize')
const {
    getStartAndEndOfMonth 
}= require('../helpers/helpers')
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
        const [accountCreated, created] = await accounts_payable.findOrCreate({
            where: {
              invoice_id: invoice_id,
              id_bank_account: id_bank_account,
              number_of_transaction: number_of_transaction,
            },
            defaults: {
              invoice_date: invoice_date,
              concept: concept,
              amount: amount,
              paid: paid,
              id_provider_account: id_provider_account
            },
          });
          

        // concept number_of_transaccion id_bank_account id_provider_account
        if (!created) {
            throw new Error('No se pueden crear facturas con el mismo id')
        }else{
            const provider = await providers.findOne({
                where:{
                    provider_id:accountCreated.id_provider_account
                },
                attributes:['provider_name']
            });
            return res.status(200).json({
                msg:'Cuenta por pagar creada',
                data:{
                    'account_id':accountCreated.account_id,
                    'invoice_date':accountCreated.invoice_date,
                    'amount':accountCreated.amount,
                    'paid':accountCreated.paid,
                    'invoice_id':accountCreated.invoice_id,
                    'provider_name':provider.provider_name,
                    'id_provider_account': accountCreated.id_provider_account
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
const getAccountsPayable= async(req = request , res = response)=>{
    const page=req.page
    const {start_range_date,end_range_date,paid}=req.query
    try {
    
        let whereObject ={}
        paid? 
        whereObject={
            invoice_date:{
                [Op.between]:[start_range_date,end_range_date]
            },
            paid:paid
        }:whereObject={
            invoice_date:{
                [Op.between]:[start_range_date,end_range_date]
            }
        }
        const offset = (page - 1) * 10;
        const result = await accounts_payable.findAndCountAll({
            attributes: ['account_id','invoice_id','invoice_date','amount','paid'],
            where:whereObject,
            offset,
            limit: 10,
            order: [['invoice_date', 'ASC']],
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