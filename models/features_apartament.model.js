const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const features_apartaments= sequelizeObj.define(
    'features_apartaments',
    {
        feature_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        area:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        maintenance_fee:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        late_fee:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }

    },{
        sequelize:sequelizeObj,
        modelName:"features_apartaments",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }

)

module.exports = features_apartaments