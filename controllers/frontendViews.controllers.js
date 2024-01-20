const {request,response}= require('express');
const path = require('path');
const logginHTML = path.join(__dirname, '..','views', 'login.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');
const financeHTML = path.join(__dirname, '..','views','finance.ejs');
const frontendLoggin = (req = request , res = response)=>{
    const logginHTML = path.join(__dirname, '..','views', 'login.ejs');
    res.render(logginHTML,{BASE_URL:process.env.BASE_URL});
}
const getFinanceFrontend =(req = request , res = response)=>{
    res.render(financeHTML,{BASE_URL:process.env.BASE_URL});
}
module.exports={
    frontendLoggin,
    getFinanceFrontend
}