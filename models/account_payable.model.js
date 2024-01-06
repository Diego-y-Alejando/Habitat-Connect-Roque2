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
        number_of_transaction:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        paid:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                is:/^[1|2]/,
                notEmpty:true
            }
        },
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
                model: providers,
                key: 'provider_id'
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
// Relación con la cuenta bancaria
bank_accounts.hasMany(accounts_payable, {
    as: 'accountOfBill',
    foreignKey: 'id_bank_account',  // Corregido el nombre de la propiedad
  });
  
  accounts_payable.belongsTo(bank_accounts, {
    as: 'paidByBankAccount',
    foreignKey: 'id_bank_account',  // Corregido el nombre de la propiedad
  });
  
  // Relación proveedor cuenta
  providers.hasMany(accounts_payable, {
    as: 'providerHaveAccountPayable',
    foreignKey: 'id_provider_account',  // Corregido el nombre de la propiedad
  });
  
  accounts_payable.belongsTo(providers, {
    as:'accountHaveProvider',
    foreignKey: 'id_provider_account',  // Corregido el nombre de la propiedad
  });
  
module.exports=accounts_payable