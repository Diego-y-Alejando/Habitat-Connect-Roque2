const {DataTypes, Model}= require('sequelize');
const {sequelizeObj}= require('../database/config');

const bank_accounts = require('./bank_accounts.model');
const providers = require('./providers.model')
const accounts_payable= sequelizeObj.define(
    'accounts_payable',{
        account_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            unique:true,
            allowNull:false
        },
        invoice_id:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZñÑ0-9]+$/,
                len:[1,100],
                notEmpty:true
            }
        },
        invoice_date:{
            type:DataTypes.DATEONLY,
            allowNull:false,
            validate:{
                isDate:true,
                isAfter:'2000-01-01',
                isBefore:'2050-01-01',
            }
        },
        concept:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZñÑ0-9.,\s]+$/,
                len:[0,180],
                notEmpty:true,
            }
        },
        amount:{
            type:DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate:{
                min:{ args: [0], msg: 'El precio no puede ser negativo' },
                max:{args: [1000000], msg: 'El precio es demasiado alto' },
            }
        },
        number_of_transaccion:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        service_description:{
            type:DataTypes.CHAR,
            validate:{
                is:/^[a-zA-ZñÑ0-9.,\s]+$/,
                len:[0,180],
                notEmpty:true,
            }
        },
        // llaves foraneas 
        // id_bank_account
        id_bank_account:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: bank_accounts,
                key: 'account_id'
            }
        },
        // id_provider_account
        id_provider_account:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: provider_id,
                key: 'account_id'
            }
        }

    },
    {
        sequelize:sequelizeObj,
        modelName:"accounts_payable",
        freezeTableName:true,
        createdAt:false,
        updatedAt:false
    }
)
// relacion con la cuenta bancaria 
bank_accounts.hasMany(accounts_payable,{
    as:'accountOfBill',
    foreingKey:'id_bank_account'
})
accounts_payable.belongsTo(bank_accounts,{
    as:'paidByBankAccount',
    foreingKey:'id_bank_account'
})

// Relacion proveedor cuenta 
providers.hasMany(accounts_payable,{
    as:'providerHaveAccountPayable',
    foreingKey:'id_provider_account'
})
accounts_payable.belongsTo(providers,{
    as:'acccountHaveProvider',
    foreingKey:'id_provider_account'

})
module.exports=accounts_payable