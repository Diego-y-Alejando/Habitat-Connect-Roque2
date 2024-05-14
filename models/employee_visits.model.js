const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const security_users = require('./security_users.model');
const resident_employee_relationship = require('./resident_employee_relationship.model')
const employee_visits = sequelizeObj.define(
    'employee_visits',{
        employee_visit_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        id_entry_employee_checked:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: security_users,
                key: 'security_user_id'
            }
        },
        id_exit_employee_checked:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: security_users,
                key: 'security_user_id'
            }
        },
        id_relationship_visit:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: resident_users,
                key: 'resident_user_id'
            }
        },
    },{
        sequelize:sequelizeObj,
        modelName:"employee_visits",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)

// RELACION DE MARCAJE DE ENTRADA 
security_users.hasMany(employee_visits,{
    as:'securityUserCheckEntryEmployee',
    foreignKey:'id_entry_employee_checked'
})
employee_visits.belongsTo(security_users,{
    as:'EntryEmployeeWasCheckedForSecurityUser',
    foreignKey:'id_entry_employee_checked'
})
// RELACION DE MARCAJE DE SALIDA
security_users.hasMany(employee_visits,{
    as:'securityUserCheckExitEmployee',
    foreignKey:'id_exit_employee_checked'
})
employee_visits.belongsTo(security_users,{
    as:'ExitEmployeeWasCheckedForSecurityUser',
    foreignKey:'id_exit_employee_checked'
})
// RELACION DE PROPIETARIOS DE LA VISITA 
resident_employee_relationship.hasMany(employee_visits,{
    as:'relationshipHaveVisit',
    foreignKey:'id_relationship_visit'
})
employee_visits.hasMany(resident_employee_relationship,{
    as:'visitComesFromRelationship',
    foreignKey:'id_relationship_visit'
})

module.exports=employee_visits