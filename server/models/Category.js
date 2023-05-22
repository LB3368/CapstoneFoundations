//require('dotenv').config()
const { sequelize } = require('../util/Database')
//const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const Category = sequelize.define(
    'Category', {
       /* id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },*/
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)
 module.exports = { Category }


 /*const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = { Category }

const { sequelize } = require('../util/Database')
//const { Sequelize, DataTypes } = require('sequelize')
/*const sequelize = new Sequelize (
    process.env.CONNECTION_STRING, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
)*/
