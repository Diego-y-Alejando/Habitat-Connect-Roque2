const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const features_apartaments= require('./features_apartament.model');
const resident_users = require('./resident_users.model')
const apartaments = sequelizeObj.define(
    'apartaments',{
        apartament_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        apartament_number:{
            type:DataTypes.CHAR,
            allowNull:false,
            unique:true
        },
        apartament_name:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/,
                len:[0,65],
                notEmpty:true
            }
        },
        apartament_level:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                is:/^\d+$/,
                notEmpty:true
            }
        },
        // llave foranea 
        id_features_apartament:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: features_apartaments,
                key: 'feature_id'
            }
        },
        id_resident_apartament:{
            type:DataTypes.INTEGER,
            allowNull:true,
            unique:true,
            references: {
                model: resident_users,
                key: 'resident_user_id'
            }
        },
        
    },
    {
        sequelize:sequelizeObj,
        modelName:"apartaments",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log
    }

);
// RELACION DE CARACTERÏSTICAS APARTAMENTO 
features_apartaments.hasMany(apartaments,{
    as:'featuresOfApartament',
    foreignKey:'id_features_apartament'
});
apartaments.belongsTo(features_apartaments,{
    as:'apartamentFeatures',
    foreignKey:'id_features_apartament'
});
// RELACION DEL RESIDENTE APARTAMENT
resident_users.hasOne(apartaments,{
    as:'residentOccupiesApartament',
    foreignKey:'id_resident_apartament'
});
apartaments.belongsTo(resident_users,{
    as:'apartamentHaveResident',
    foreignKey:'id_resident_apartament'
});

module.exports=apartaments