const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const resident_users = require('./resident_users.model')
const security_users = require('./security_users.model')
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
                len:[0,60],
                notEmpty:true
            }
        },
        visitors_name:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s]+$/,
                len:[0,60],
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
        visit_date:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
                notEmpty:true
                //is:
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
                model: resident_users,
                key: 'resident_user_id'
            }
       },
       id_entry_visit_checked:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: security_users,
                key: 'security_user_id'
            }
        },
       id_exit_visit_checked:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model: security_users,
                key: 'security_user_id'
            }
        },
        cancel_state:{
            type:DataTypes.TINYINT,
            allowNull:false,
            validate:{
                notEmpty:true
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


// RELACION DE MARCAJE DE ENTRADA 
security_users.hasMany(home_visit,{
    as:'securityUserCheckEntryVisit',
    foreignKey:'id_entry_visit_checked'
})
home_visit.belongsTo(security_users,{
    as:'EntryVisitWasCheckedForSecurityUser',
    foreignKey:'id_entry_visit_checked'
})


// RELACION DE MARCAJE DE SALIDA 
security_users.hasMany(home_visit,{
    as:'securityUserCheckExitVisit',
    foreignKey:'id_exit_visit_checked'
})
home_visit.belongsTo(security_users,{
    as:'ExitVisitWasCheckedForSecurityUser',
    foreignKey:'id_exit_visit_checked'
})


// RELACION RESIDENTE CREADOR DE VISITA
resident_users.hasMany(home_visit,{
    as:'residentCreateVisit',
    foreignKey:'id_visit_creator'
})
home_visit.belongsTo(resident_users,{
    as:'homVisitWasCreateForResident',
    foreignKey:'id_visit_creator'
})


module.exports=home_visit