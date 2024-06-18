const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');
const resident_users = require('../models/resident_users.model');
const security_users = require('../models/security_users.model');
const package_delivery = sequelizeObj.define(
    'package_delivery',{
        package_delivery_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        resident_name:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ0-9\s]+$/,
                len:[0,65],
                notEmpty:true
            }
        },
        company_name:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                is:/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9. ]+$/,
                len:[0,65],
                notEmpty:true
            }
        },
        delivery_date:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
                isDate:true,
                isAfter:'2000-01-01',
                isBefore:'2050-01-01',
            }
        },
        arrive_time:{
            type:DataTypes.DATE,
            allowNull:true,
            validate:{
               // is:/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
            }
        },
        package_delivery_state:{
            type:DataTypes.TINYINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        id_package_recipient:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: security_users,
                key: 'security_user_id'
            }
        },
        id_delivery_creator:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: resident_users,
                key: 'resident_user_id'
            }
        },
        cancel_state:{
            type:DataTypes.TINYINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:"package_delivery",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log 
    }
)

// relacion apartamento paquete 

resident_users.hasMany(package_delivery,{
    as:'residentRequestPackage',
    foreignKey:'id_delivery_creator'
});
package_delivery.belongsTo(resident_users,{
    as:'packageForResident',
    foreignKey:'id_delivery_creator'
});


// relacion receptor de paquete
security_users.hasMany(package_delivery,{
    as:'securityUserRecipientPackage',
    foreignKey:'id_package_recipient'
});
package_delivery.belongsTo(security_users,{
    as:'packageReceivedBy',
    foreignKey:'id_package_recipient'
});

module.exports=package_delivery
