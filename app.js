require('dotenv').config();

const Server = require('./models/server');
const {testConnection} = require('./database/config')

async function startServer() {
    try{
        await testConnection()
        const server =new Server();
        server.listen();
     }catch(error){
         console.log(error);
     }
}
startServer();