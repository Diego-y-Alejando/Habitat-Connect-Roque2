const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const users = require('./users.model')
const security_users = sequelizeObj.define(
    'security_users',{
        security_user_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        id_security_user:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: users,
                key: 'user_id'
            }
        },
    },
    {
        sequelize:sequelizeObj,
        modelName:"security_users",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log
    }

)
users.hasOne(security_users,{
    as:'userAreSecurity',
    foreignKey:'id_security_user'
});
security_users.belongsTo(users,{
    as:'securityHaveUserInfo',
    foreignKey:'id_security_user'
})

module.exports= security_users