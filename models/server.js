const express = require('express');
const cors = require('cors');
const path = require('path');
const {corsOptions, cookieOptions}= require('../helpers/helpers.js')
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const {
    checkDuplicateQueryParams,
    checkDuplicateBodyParams
} = require('../middlewares/duplicateParameters.middlewares');
const swaggerUI= require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const compression = require('../middlewares/compression.middleware')
const {
    generateSecret,
    RedisStore,
    session,
    redisClient,
    redisConnection
}=require('../redis/redisClient')

class Server {
    constructor(){
        this.app=express();
        this.testRedisConnection();
        this.middlewares();
        this.usersPath ='/users'
        this.adminPath='/administracion'
        this.residentPath='/resident'
        this.securityPath='/seguridad'
        this.port =process.env.PORT
        this.swaggerJsDoc=swaggerJsDoc
        this.swaggerUI = swaggerUI
        this.swaggerSpec ={
            definition:{
                openapi:'3.0.0',
                info:{
                    title:'Habitat connect Roque 2',
                    version:"1.0.0"
                },
                servers:[
                    {
                        url:`${process.env.BASE_URL}/residente/api-doc`
                    },
                    {
                        url:`${process.env.BASE_URL}/administracion/api-doc`
                    },
                    {
                         url:`${process.env.BASE_URL}/seguridad/api-doc`
                    },
                ],
            },
            apis:[`${path.join(__dirname,"../routes/documentation routes/resident.docs.js")}`],
        }
        this.swaggerDocs = this.swaggerJsDoc(this.swaggerSpec);
        this.routes();  
    }
    async dbConnection(){
        await testConnection();
    }
    testRedisConnection(){
        redisConnection();
    }
    middlewares(){
        // this.app.use(helmet())
        
        this.app.use(express.json())
        this.app.use(compression)
        this.app.use(cookieParser());
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.disable('x-powered-by');
        this.app.use(session({
            store: new RedisStore({ client: redisClient,prefix: "sess:" }),
            secret: '123456788',// se debe implementar un sistema de gestion de secretos generateSecret(),
            name: 'session', // Usar un nombre de cookie personalizado
            resave: false,
            saveUninitialized: false,
            rolling: true, // Reiniciar el tiempo de expiración en cada respuesta
            cookie:cookieOptions
          }))
        // this.app.use(checkDuplicateQueryParams)
        // this.app.use(checkDuplicateBodyParams)    
    }
    routes(){
        this.app.use(`${this.residentPath}/api-doc`,this.swaggerUI.serve,this.swaggerUI.setup(this.swaggerDocs))
        this.app.use(this.adminPath, require('../routes/admin.routes'));
        this.app.use(this.residentPath, require('../routes/resident.routes'));
        // this.app.use(this.securityPath, require('../routes/security.routes'));
        this.app.use(require('../routes/users.routes'));
        this.app.use('/public',express.static('public'));
        this.app.use('/dist', express.static(path.join(__dirname,'../dist')));
        
        this.app.set('view engine', 'ejs');
        this.app.set('views', express.static('public'));
        
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo");
        })
    }
}
module.exports= Server