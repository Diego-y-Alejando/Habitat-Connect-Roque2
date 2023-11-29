const express = require('express');
const cors = require('cors');
const path = require('path');

class Server {
    constructor(){
        this.app=express();
        this.middlewares();
        this.adminPath='/admin'
        this.routes()
        this.port =process.env.port
    }
    middlewares(){
        // this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.adminPath, require('../routes/admin.routes'));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo");
        })
    }
}
module.exports= Server