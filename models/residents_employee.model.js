const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const residents_employee = sequelizeObj.define(
    'residents_employee',{
        maid_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
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
        phone_number:{
            type:DataTypes.CHAR,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true,
                is:/^[0-9]{4}-[0-9]{4}/
            }
        },
        occupation_list:{
            type:DataTypes.JSON,
            allowNull:false,
        },
    },
    {
        sequelize:sequelizeObj,
        modelName:"residents_employee",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log 
    }

)

module.exports = residents_employee