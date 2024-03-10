const {request,response}= require('express');
const path = require('path');
const logginHTML = path.join(__dirname, '..','views', 'login.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const financeHTML = path.join(__dirname, '..','views','finance.ejs');

const providers = require('../models/providers.model')
const bank_accounts = require('../models/bank_accounts.model');
const {
    getDataValuesOnly ,
    generateHashForFile,
    jqueryHash
} = require('../helpers/helpers')

const logginFileRelativeRoutesArr = ['public/js/login.js','public/css/login.css','public/js/jquery-3.6.3.min.js']


const frontendLoggin = (req = request , res = response)=>{
    const logginHTML = path.join(__dirname, '..','views', 'login.ejs');
    const hashArray = []
    logginFileRelativeRoutesArr.forEach((element)=>{
       let hashFileValue= generateHashForFile(element)
       hashArray.push(hashFileValue)
    })
    // console.log(generateHashForFile('public/js/login.js'));
    // console.log(hashArray[0]);
    res.render(logginHTML,{BASE_URL:process.env.BASE_URL, loginScriptHash:hashArray[0], loginStyleSheetHash:hashArray[1], jqueryHash:jqueryHash()});
}
const getFinanceFrontend = async(req = request , res = response)=>{
    try {
        const providersData = await providers.findAll({
            attributes:['provider_id','provider_name']
        })
        const accounts = await bank_accounts.findAll({
            attributes:['account_id','account_number']
        })
        
        const newProvidersData = getDataValuesOnly(providersData)
        const newBankAccountsData =getDataValuesOnly(accounts)
        res.render(financeHTML,{
            BASE_URL:process.env.BASE_URL,
            accounts:newBankAccountsData,
            providers:newProvidersData
        });
        
    } catch (error) { 
        res.render(error404HTML,{error:error.message});

    }
}
module.exports={
    frontendLoggin,
    getFinanceFrontend
}