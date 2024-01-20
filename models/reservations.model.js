const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const apartament = require('./apartament.model')
const amenities = require('./amenities.model')
const reservations= sequelizeObj.define(
    'reservations',{
        reserv_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        reservation_date:{
            type:DataTypes.DATEONLY,
            allowNull:false,
            validate:{
                isDate:true,
                isAfter:'2000-01-01',
                isBefore:'2050-01-01',
            }
        },
        start_reserv_time:{
            type:DataTypes.TIME,
            allowNull:false,
            // validate:{
            //     is: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
            // }
        },
        end_reserv_time:{
            type:DataTypes.TIME,
            allowNull:false,
            // validate:{
            //     // is: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
            //     notEmpty:true
            // }
        },
        renter_name:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/
            }
        },
        renter_phone:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^\d{4}-\d{4}$/
            }
        },
        reserv_state:{
            type:DataTypes.TINYINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        // llaves foraneas
        id_apartament_reservations:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: apartament,
                key: 'apartament_id'
            }
        },
        id_amenity_reserved:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: amenities,
                key: 'amenity_id'
            }
        }
    },{
        sequelize:sequelizeObj,
        modelName:"reservations",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)
// Relacion de reserva de apto
reservations.belongsTo(apartament,{
    as:'reservationHaveRenter',
    foreignKey:'id_apartament_reservations'
});

apartament.hasMany(reservations,{
    as:'apartamentMakeReservation',
    foreignKey:'id_apartament_reservations'
})
// relacion reserva con amenidad
reservations.belongsTo(amenities,{
    as:'reservationHaveAmenity',
    foreignKey:'id_amenity_reserved'
})
amenities.hasMany(reservations,{
    as:'amenityHaveReservations',
    foreignKey:'id_amenity_reserved'
})
module.exports= reservations 