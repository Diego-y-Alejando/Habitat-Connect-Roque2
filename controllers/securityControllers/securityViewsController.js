
const {request,response}= require('express');
const path = require('path');
const error404HTML = path.join(__dirname, '..','views','404.ejs');

const securityControlPanel = path.join(__dirname,'..','..','views','securityViews','controlPanel.ejs')

const {
    getDataValuesOnly ,
    generateHashForFile,
    jqueryHash
} = require('../../helpers/helpers')

const viewSecurityControlPanelController=(req = request ,res = response)=>{
    try {
        res.render(securityControlPanel,{BASE_URL:process.env.BASE_URL});
        // return res.status(404).json({
        //     message:securityControlPanel,
        //     ok:false
        // })

    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}

module.exports={
    viewSecurityControlPanelController
}