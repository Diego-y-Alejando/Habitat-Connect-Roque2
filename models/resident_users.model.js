const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const users = require('./users.model')
const resident_users = sequelizeObj.define(
    'resident_users',{
        resident_user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        id_resident_user:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: users,
                key: 'user_id'
            }
        },
    },{
        sequelize:sequelizeObj,
        modelName:"resident_users",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)
users.hasOne(resident_users,{
    as:'userAreResident',
    foreignKey:'id_resident_user'
});
resident_users.belongsTo(users,{
    as:'residentHaveUserInfo',
    foreignKey:'id_resident_user'
})

module.exports= resident_users