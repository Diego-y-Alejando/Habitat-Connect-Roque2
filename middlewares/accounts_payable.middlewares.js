const {response, request}= require('express')

const{
    bodyVerification,
    tokenValidation,
    validationDates,
    validationParagraph,
    ValidationIdOrLevel,
    userExist,
    validatePage
}= require('./common.middlewares')
const bank_accounts = require('../models/bank_accounts.model');
const providers = require('../models/providers.model')
const user = require('../models/user.model')
const accounts_payable = require('../models/account_payable.model')
const createAccountPayableValidations = async(req = request , res = response, next)=>{
    const token = req.headers.authorization
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
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        bodyVerification(req.body,['invoice_id', 'invoice_date', 'concept', 'amount', 'number_of_transaction', 'paid', 'id_bank_account', 'id_provider_account'])
        validationInvoiceId(invoice_id);
        validationDates(invoice_date);
        validationParagraph(concept);
        validationAmount(amount);
        validationNumberOfTransaccion(number_of_transaction);
        validationPaidStatus(paid);
        ValidationIdOrLevel('id de la cuenta de banco',id_bank_account);
        ValidationIdOrLevel('id del proveedor',id_provider_account);
        await  userExist('La cuenta de banco que solicita',bank_accounts,id_bank_account,'account_id',[ 'bank','account_number','type_account']);
        await  userExist('El provdeedor', providers,id_provider_account,'provider_id',[ 'provider_name', 'phone_number', 'bank_account', 'bank_name', 'type_account', 'payment_methods', 'service_description'])
        next()
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getAccountsPayableValidations = async(req = request , res = response, next)=>{
    const token = req.headers.authorization
    const page = parseInt(req.query.page)
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']); 
        validatePage(page);
        next()
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const getAccountPayableDataValidations = async(req = request , res = response, next)=>{
    const token = req.headers.authorization
    const account_id = req.params.account_id
    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        ValidationIdOrLevel('id de la cuenta por pagar',account_id);
        await  userExist('La cuenta por pagar ',accounts_payable,account_id,'account_id',['invoice_id', 'invoice_date', 'concept', 'amount', 'number_of_transaction', 'paid', 'id_bank_account', 'id_provider_account']);
        next()
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
const updateAccountPayableValidations = async(req = request , res = response, next)=>{
    const token = req.headers.authorization
    const account_id = req.params.account_id
    const {
        invoice_id,
        invoice_date, 
        concept, 
        amount, 
        number_of_transaction, 
        paid, 
        id_bank_account, 
        id_provider_account
    }= req.body;

    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        bodyVerification(req.body,['invoice_id', 'invoice_date', 'concept', 'amount', 'number_of_transaction', 'paid', 'id_bank_account', 'id_provider_account']);
        validationInvoiceId(invoice_id);
        validationDates(invoice_date);
        validationParagraph(concept);
        validationAmount(amount);
        validationNumberOfTransaccion(number_of_transaction);
        ValidationIdOrLevel('id de la cuenta de banco',id_bank_account);
        ValidationIdOrLevel('id del proveedor',id_provider_account);
        await  userExist('La cuenta de banco que solicita',bank_accounts,id_bank_account,'account_id',[ 'bank','account_number','type_account']);
        // hacer un innerJoin entre estos dos modelos 
        await  userExist('El provdeedor', providers,id_provider_account,'provider_id',[ 'provider_name', 'phone_number', 'bank_account', 'bank_name', 'type_account', 'payment_methods', 'service_description']);
        await  userExist('La cuenta por pagar ',accounts_payable,account_id,'account_id',['invoice_id', 'invoice_date', 'concept', 'amount', 'number_of_transaction', 'paid', 'id_bank_account', 'id_provider_account']);
        next();
    }catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }

}
const changeAccountPaidStatusValidations = async(req = request , res = response, next)=>{
    const token = req.headers.authorization;
    const {
        paid,
        account_id
    }=req.body

    try {
        await tokenValidation(token,user,'user_id',['name','lastname','email','phone_number','dpi','password'],process.env.SECRETKEYAUTH,['admin']);
        await  userExist('La cuenta por pagar ',accounts_payable,account_id,'account_id',['invoice_id', 'invoice_date', 'concept', 'amount', 'number_of_transaction', 'paid', 'id_bank_account', 'id_provider_account']);
        validationPaidStatus(paid);
        next();
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports ={
    createAccountPayableValidations,
    getAccountsPayableValidations,
    getAccountPayableDataValidations,
    updateAccountPayableValidations,
    changeAccountPaidStatusValidations,
}
const validationInvoiceId=(invoice_id)=>{
    const regexInvoiceId =/^[a-zA-Z0-9]+$/

    if (!invoice_id) {
        throw new Error('El número de factura no puede venir vacío')
    }if (!regexInvoiceId.test(invoice_id)) {
        throw new Error('El número de factura contiene caractéres inválidos')
    }
}
const validationAmount =(amount)=>{
    const regexAmount = /^[\d]{1,5}[.][\d]{2}/
    if (!amount) {
        throw new Error('El monto de la cuenta no puede venir vacío');
    }
    if (!regexAmount.test(amount)) {
        throw new Error('El precio debe ser en este formato 0.00')
    }
}
const validationNumberOfTransaccion= (number_of_transaction)=>{
    const regexNumberOfTransaccion=/^[\d]{1,3}/
    if (!number_of_transaction) {
        throw new Error('El número de transaccion no debe venir vacio')
    }
    if (!regexNumberOfTransaccion.test(number_of_transaction)) {
        throw new Error('El número de transaccion solo debe incluir números')
    }
}
const validationPaidStatus =(paid)=>{
    const regexPaidStatus=/^1|2/

    if (!paid) {
        throw new Error('La cuenta debe estar registrada como pagada o no pagada su estado no puede venir vacío')
    }
    if (!regexPaidStatus.test(paid)) {
        throw new Error('El estatus de pago de la cuenta trae caractéres inválidos ')
    }
}