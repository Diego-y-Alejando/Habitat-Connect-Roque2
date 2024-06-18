const {request,response}= require('express');
const path = require('path');
const logginHTML = path.join(__dirname, '..','views', 'login.ejs');
const error404HTML = path.join(__dirname, '..','views','404.ejs');


const apartmentDetailHTML = path.join(__dirname, '..','views','apartmentDetails.ejs');


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

const adminControlPanel = path.join(__dirname, '..','views','adminControlPanel.ejs');


const getAdminControlPanelController =(req = request , res = response)=>{
    try {
        
        return  res.render(adminControlPanel,{
            BASE_URL:process.env.BASE_URL
        });
    } catch (error) {
        return  res.render(error404HTML,{
            error:error.message,
            ok:false
        });
    }
}



module.exports={
    frontendLoggin,
    getAdminControlPanelController
}