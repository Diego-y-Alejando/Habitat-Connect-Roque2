const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');
const resident_employee_relationships = require('./resident_employee_relationships.model')
const resident_employee_schedule= sequelizeObj.define(
    'resident_employee_schedule',{
        schedule_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        days_list:{
          type:DataTypes.JSON,
          allowNull:false,
        },
        month_list:{
          type:DataTypes.JSON,
          allowNull:false,
        },
        id_relationship_schedule:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: resident_employee_relationships,
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


resident_employee_relationships.hasOne(resident_employee_schedule,{
    as:'relationshipHaveSchedule',
    foreignKey:'id_relationship_schedule'
})
resident_employee_schedule.belongsTo(resident_employee_relationships,{
    as:'scheduleComesFromRelationship',
    foreignKey:'id_relationship_schedule'
})

module.exports= resident_employee_schedule
