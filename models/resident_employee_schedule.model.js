const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');
const resident_employee_relationship = require('./resident_employee_relationship.model')
const resident_employee_schedule= sequelizeObj.define(
    'resident_employee_schedule'{
        schedule_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        january:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        february:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        march:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        april:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        may:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        june:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        july:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        august:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        september:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        october:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        november:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        december:{
            type:DataTypes.JSON,
            validate: {
                isObject(value) {
                  if (typeof value !== 'object') {
                    throw new Error('El valor debe ser un objeto JSON válido');
                  }
                }
            }
        },
        id_relationship_schedule:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: resident_employee_relationship,
                key: 'relationship_id'
            }
        }
    },{
        sequelize:sequelizeObj,
        modelName:"resident_employee_schedule",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    });


resident_employee_relationship.hasOne(resident_employee_schedule,{
    as:'relationshipHaveSchedule',
    foreignKey:'id_relationship_schedule'
})
resident_employee_schedule.belongsTo(resident_employee_relationship,{
    as:'scheduleComesFromRelationship',
    foreignKey:'id_relationship_schedule'
})

module.exports= resident_employee_schedule
