require('dotenv').config()
//const express = require('express')
//const Category = require('./Category')
const sequelize = require('../util/Database')
const {  DataTypes } = require('sequelize')

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})


module.exports = { Todo }