const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const bank_accounts= sequelizeObj.define(
    'bank_accounts',{
        account_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        bank:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^[a-zA-Z]+$/,
            }
        },
        account_number:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true
            }
        },
        type_account:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                is:/^[a-zA-Z ]+$/,
                notEmpty:true
            }
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:"bank_accounts",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)

module.exports=bank_accounts