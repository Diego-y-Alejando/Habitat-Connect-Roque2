const {Sequelize}= require('sequelize');


const db_name =process.env.DB_NAME;
const db_user =process.env.DB_USER;
const db_pass= process.env.DB_PASS;

const db_host = process.env.DB_HOST;
const db_port =process.env.DB_PORT;

const sequelizeObj = new Sequelize(db_name, db_user, db_pass,{
    dialect:'mysql',
    host :db_host,
    port: db_port
})

const testConnection = async () => {
    try {
        await sequelizeObj.authenticate();
        console.log('Conexión exitosa');
    } catch (error) {
        console.error(`No se pudo conectar, reintentando`, error);
    }
};

module.exports={
    sequelizeObj,
    testConnection
}