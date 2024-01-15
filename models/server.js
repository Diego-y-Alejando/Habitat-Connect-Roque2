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
        
        this.app.use((req, res, next) => {
            if (req.path.endsWith('.js')) {
                res.type('text/javascript');
            }
            next();
        });
    }
    routes(){
        this.app.use(this.adminPath, require('../routes/admin.routes'));
        this.app.use(this.userPath, require('../routes/user.routes'));
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