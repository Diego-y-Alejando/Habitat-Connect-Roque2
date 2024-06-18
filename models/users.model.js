const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const users = sequelizeObj.define(
    'users',{
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        user_type:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/\b(resident|admin|security)\b/
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
        phone_number:{
            type:DataTypes.CHAR,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true,
                is:/^[0-9]{4}-[0-9]{4}/
            }
        },
        dpi:{
            type:DataTypes.CHAR,
            allowNull:false,
            unique:true,
            validate: {
                    is:['^[0-9-]+$'],
                    len:[14,15],
                    notEmpty: true,
            }
        },
        password:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }

    },{
        sequelize:sequelizeObj,
        modelName:"users",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)

module.exports= users