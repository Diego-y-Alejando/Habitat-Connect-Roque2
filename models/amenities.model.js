const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const amenities = sequelizeObj.define(
    'amenities',{
        amenity_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        amenity_name:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-Z ]+$/,
                len:[1,50],
                notEmpty:true
            }
        },
        rent_cost:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                min:{ args: [0], msg: 'El precio no puede ser negativo' },
                max:{args: [1000000], msg: 'El precio es demasiado alto' },
            }
        },
        start_time:{
            type:DataTypes.TIME,
            allowNull:false,
            validate:{
                is:/^([01]\d|2[0-3]):([0-5]\d)/
            }
        },
        end_time:{
            type:DataTypes.TIME,
            allowNull:false,
            validate:{
                is:/^([01]\d|2[0-3]):([0-5]\d)/
            }
        },
        additional_cost_per_hour:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false
        },
        nickName :{
            type:DataTypes.CHAR,
            allowNull:false
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:"amenities",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)
module.exports=amenities