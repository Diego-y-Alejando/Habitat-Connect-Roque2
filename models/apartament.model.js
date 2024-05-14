const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const features_apartaments= require('./features_apartament.model');
const apartament = sequelizeObj.define(
    'apartament',{
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
        ocupation_state:{
            type:DataTypes.TINYINT,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^0|1/
            }
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:"apartament",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log
    }

);

features_apartaments.hasMany(apartament,{
    as:'featuresOfApartament',
    foreignKey:'id_features_apartament'
});
apartament.belongsTo(features_apartaments,{
    as:'apartamentFeatures',
    foreignKey:'id_features_apartament'
});

module.exports=apartament