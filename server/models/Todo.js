require('dotenv').config()

const { sequelize } = require('../util/Database')
const { DataTypes } = require('sequelize')

const Todo = sequelize.define('Todo', {
    /*id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },*/
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    CategoryId: {
        type: DataTypes.INTEGER
    }
})


module.exports = { Todo }


//const express = require('express')
//const Category = require('./Category')
//const sequelize = require('../util/Database')
//const {  DataTypes } = require('sequelize')

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