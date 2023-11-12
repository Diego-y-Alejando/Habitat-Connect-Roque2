const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const apartament = require('./apartament.model')
const amenities = require('./amenities,model')
const reservations= sequelizeObj.define(
    'reservations',{
        reserv_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true
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
            validate:{
                is:/^([01]\d|2[0-3]):([0-5]\d)/
            }
        },
        end_reserv_time:{
            type:DataTypes.TIME,
            allowNull:false,
            validate:{
                is:/^([01]\d|2[0-3]):([0-5]\d)/
            }
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
                model: bank_accounts,
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
    foreingKey:'id_apartament_reservations'
});

apartament.hasMany(reservations,{
    as:'apartamentMakeReservation',
    foreingKey:'id_apartament_reservations'
})
// relacion reserva con amenidad
reservations.belongsTo(amenities,{
    as:'reservationHaveAmenity',
    foreingKey:'id_amenity_reserved'
})
amenities.hasMany(reservations,{
    as:'amenityHaveReservations',
    foreingKey:'id_amenity_reserved'
})
module.exports= reservations 