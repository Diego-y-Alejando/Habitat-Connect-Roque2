const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const resident_users = require('./resident_users.model');
const residents_employee =require('./residents_employee.model');
const resident_employee_relationships= sequelizeObj.define(
    'resident_employee_relationships',{
        relationship_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        boss_phone_number_1:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^\d{4}-\d{4}$/
            }
        },
        boss_phone_number_2:{
            type:DataTypes.CHAR,
            allowNull:true,
            validate:{
                notEmpty:true,
                is:/^\d{4}-\d{4}$/
            }
        },
        id_resident_boss:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: resident_users,
                key: 'resident_user_id'
            }
        },
        id_employe_of_resident:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: residents_employee,
                key: 'maid_id'
            }
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:"resident_employee_relationships",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
);

residents_employee.hasMany(resident_employee_relationships,{
    as:'employeeHaveRelationship',
    foreignKey:'id_employe_of_resident'
})
resident_employee_relationships.belongsTo(residents_employee,{
    as:'relationshipWhitEmploye',
    foreignKey:'id_employe_of_resident'
})
// relacion con el residente 
resident_users.hasMany(resident_employee_relationships,{
    as:'residentHaveRelationship',
    foreignKey:'id_resident_boss'
})
resident_employee_relationships.belongsTo(resident_users,{
    as:'relationshipWithResident',
    foreignKey:'id_resident_boss'
})
module.exports= resident_employee_relationships