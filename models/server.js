const express = require('express');
const cors = require('cors');
const path = require('path');

class Server {
    constructor(){
        this.app=express();
        this.middlewares();
        this.adminPath='/admin'
        this.userPath='/user'
        this.routes()
        this.port =process.env.PORT
    }
    middlewares(){
        // this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
        this.app.use((req, res, next) => {
            if (req.path.endsWith('.js')) {
                res.type('text/javascript');
            }
            next();
        });
        this.app.use(express.static('dist'));
    }
    routes(){
        this.app.use(this.adminPath, require('../routes/admin.routes'));
        this.app.use(this.userPath, require('../routes/user.routes'));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo");
        })
    }
}
module.exports= Server