const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const security_user = require('./securityUser.model')
const apartament = require('./apartament.model')
const home_visit = sequelizeObj.define(
    'home_visit',{
        home_visit_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        resident_name:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/,
                len:[0,65],
                notEmpty:true
            }
        },
        visitors_name:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/,
                len:[0,65],
                notEmpty:true
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
        start_visit_time:{
            type:DataTypes.DATE,
            allowNull:true,
            validate:{
                //is:/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
            }
        },
        end_visit_time: {
            type:DataTypes.DATE,
            allowNull:true,
            validate:{
                // is:/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
            }
        },
        home_visit_state:{
            type:DataTypes.TINYINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        id_visit_creator:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: security_user,
                key: 'security_user_id'
            }
       },
        id_apartament_visit:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: apartament,
                key: 'apartament_id'
            }
       }
    },{
        sequelize:sequelizeObj,
        modelName:"home_visit",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
        logging: console.log
    }
)

apartament.hasMany(home_visit,{
    as:'apartamentHaveHomeVisit',
    foreignKey:'id_apartament_visit'
});
home_visit.belongsTo(apartament,{
    as:'HomeVisitForApartament',
    foreignKey:'id_apartament_visit'
});

security_user.hasMany(home_visit,{
    as:'securityCreateVisit',
    foreignKey:'id_visit_creator'
})
home_visit.belongsTo(security_user,{
    as:'homeVisitCreatedBy',
    foreignKey:'id_visit_creator'
})


module.exports=home_visit