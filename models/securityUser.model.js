const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const security_user = sequelizeObj.define(
    'security_user',{
        security_user_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        user_type:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        name:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/
            }
        },
        lastname:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/
            }
        },
        email:{
            type:DataTypes.CHAR,
            unique:true,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true,
                is:/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
                len:[5,100],
                notEmpty:true,
            }
        },
        password:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:"security_user",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log
    }

)

module.exports= security_user