const helmet = require("helmet")
const {
    generateHashForFile
} = require('../helpers/helpers')
const scriptSrc =[
    "'self'",
    generateHashForFile('public/js/login.js') 
]
const styleSrc =[
    "'self'",
    generateHashForFile('public/css/login.css')
]
const imgSrc =["'self'"]
const frameSrc = ["'self'"]
module.exports= helmet({
    contentSecurityPolicy: {
        directives: {
            scriptSrc:scriptSrc,
            styleSrc:styleSrc, 
            imgSrc:imgSrc,
            frameSrc:frameSrc
        }   
    },
    crossOriginEmbedderPolicy:'require-corp',// para permitir obligatoriamente desde el mismo sitio 
    crossOriginOpenerPolicy: "same-origin",//para permitir ventanas emergentes solo del mismo sitio
    crossOriginResourcePolicy:'same-origin',
    referrerPolicy:{ 
        policy:'strict-origin'
    },
    strictTransportSecurity:{ // requiere la comunicación https
        maxAge: 31536000,             // Duración de un año en segundos
        includeSubDomains: true,     // Incluir subdominios
        preload: true 
    },
    xDnsPrefetchControl: { allow: false },
})