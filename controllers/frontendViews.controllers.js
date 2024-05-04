const {request,response}= require('express');
const path = require('path');
const logginHTML = path.join(__dirname, '..','views', 'login.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const financeHTML = path.join(__dirname, '..','views','finance.ejs');



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
    
    res.render(logginHTML,{BASE_URL:process.env.BASE_URL, loginScriptHash:hashArray[0], loginStyleSheetHash:hashArray[1], jqueryHash:jqueryHash()});
}

module.exports={
    frontendLoggin
}