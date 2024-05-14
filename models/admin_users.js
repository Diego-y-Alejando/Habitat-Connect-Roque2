const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');
const users = require('./users.model')
const admin_users = sequelizeObj.define(
    'admin_users',{
        admin_user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
            allowNull:false
        },
        user_type:{
            type:DataTypes.CHAR,
            allowNull:false,
            validate:{
                notEmpty:true,
                is:/b(admin)\b/
            }
        },
        id_admin_user:{
            type:DataTypes.INTEGER,
            allowNull:true,
            unique:true,
            references: {
                model: users,
                key: 'user_id'
            }
        },
    },{
        sequelize:sequelizeObj,
        modelName:"admin_users",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)

users.hasOne(admin_users,{
    as:'userAreAdmin',
    foreignKey:'id_admin_user'
});
admin_users.belongsTo(users,{
    as:'adminHaveUserInfo',
    foreignKey:'id_admin_user'
})

module.exports= admin_users;
