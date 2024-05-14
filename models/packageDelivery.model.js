const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');
const apartament = require('../models/apartament.model');
const security_user = require('../models/securityUser.model');
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
            validate:{
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ0-9\s]+$/,
                len:[0,65],
                notEmpty:true
            }
        },
        company_name:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9. ]+$/,
                len:[0,65],
                notEmpty:true
            }
        },
        delivery_time:{
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
                model: security_user,
                key: 'security_user_id'
            }
        },
        id_delivery_creator:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: security_user,
                key: 'security_user_id'
            }
        },
        id_apartament_package:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: apartament,
                key: 'apartament_id'
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

apartament.hasMany(package_delivery,{
    as:'apartamentMakeDelivery',
    foreignKey:'id_apartament_package'
});
package_delivery.belongsTo(apartament,{
    as:'packageForApartament',
    foreignKey:'id_apartament_package'
});

// relacion creador paquete 

security_user.hasMany(package_delivery,{
    as:'securityUserCreatePackage',
    foreignKey:'id_delivery_creator'
});
package_delivery.belongsTo(security_user,{
    as:'packageCreateForSecurityUser',
    foreignKey:'id_delivery_creator'
});

// relacion receptor de paquete
security_user.hasMany(package_delivery,{
    as:'securityUserRecipientPackage',
    foreignKey:'id_package_recipient'
});
package_delivery.belongsTo(security_user,{
    as:'packageReceivedBy',
    foreignKey:'id_package_recipient'
});

module.exports=package_delivery
