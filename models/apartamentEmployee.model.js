const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const apartament = require('./apartament.model')
const apartament_employee = sequelizeObj.define(
    'apartament_employee',{
        apt_employee_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        name:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/
            }
        },
        lastname:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/
            }
        },
        dpi:{
            type:DataTypes.CHAR,
            allowNull:false,
            unique:true,
            validate: {
                    is:['^[0-9-]+$'],
                    len:[14,15],
                    notEmpty: true,
            }
        },
        phone_number:{
            type:DataTypes.CHAR,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true,
                is:/^\(\d{3}\)\d{4}-\d{4}$/
            }
        },
        boss_name:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/
            }
        },
        boss_phone_1:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/^\(\d{3}\)\d{4}-\d{4}$/
            }
        },
        boss_phone_2:{
            type:DataTypes.CHAR,
            allowNull:true,
            validate:{
                is:/^\(\d{3}\)\d{4}-\d{4}$/
            }
        },
        id_employee_apartament:{
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
        modelName:"apartament_employee",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log 
    }

)

apartament.hasMany(apartament_employee,{
    as:'apartamentHaveEmployee',
    foreignKey:'id_employee_apartament'
});
apartament_employee.belongsTo(apartament,{
    as:'employeeWorkAtApartament',
    foreignKey:'id_employee_apartament'
});

module.exports = apartament_employee