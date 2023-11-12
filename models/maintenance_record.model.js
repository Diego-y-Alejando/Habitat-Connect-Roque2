const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const apartament = require('./apartament.model')
const maintenance_record = sequelizeObj.define(
    'maintenance_record',{
        record_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            unique:true,
            allowNull:false
        }
        current_year:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isInt: true,
              min: 1901,  // El año mínimo admitido por MySQL
              max: 2155,  // El año máximo admitido por MySQL
            },
        },
        january:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        frebuary:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        march:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        april:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        may:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        june:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        juli:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        august:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        september:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        october:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        november:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        december:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        id_apartament_maintenance:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: apartament,
                key: 'apartament_id'
            }
        }
    },{
        sequelize:sequelizeObj,
        modelName:"maintenance_record",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)

maintenance_record.belongsTo(apartament,{
    as:'apartamentHaveMaintenanceRecord',
    foreingKey:'id_apartament_maintenance'
});
apartament.hasMany(maintenance_record,{
    as:'maintenanceHaveApartament',
    foreingKey:'id_apartament_maintenance'
});
module.exports= maintenance_record