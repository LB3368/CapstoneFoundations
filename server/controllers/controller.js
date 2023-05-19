require('dotenv').config()
const { Todo } = require('../models/Todo')
const { Category } = require('../models/Category')
//const { CONNECTION_STRING } = process.env
//const Sequelize = require('sequelize')

/*const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})*/

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll()
        res.send(todos)
    } catch (err) {
        res.status(500).send({ error: 'Server error' })
    }
}

//Adding a new Todo
const addTodo = async (req, res) => {
    const { text, CategoryId, completed } = req.body

    try {
        const newTodo = await Todo.create ({ text, completed })
        const category = await Category.findByPk(CategoryId)
        if (category) {
            await newTodo.setCategory(category)
        }
        res.status(200).send(newTodo)
    } catch (error) {
        res.status(400).send({ error: 'Bad request' })
    }
}

// To Update the todo
const updateTodo = async (req, res) => {
    const id = parseInt(req.params.id)
    const { completed, CategoryId } = req.body

    try {
        const todo = await Todo.findByPk(id)
        if (todo) {
            todo.completed = completed
            await todo.save()
            if (CategoryId) {
                const category = await Category.findByPk(CategoryId)
                if (category) {
                    await todo.setCategory(category)
                }
            }
            res.send(todo)
        } else {
            res.status(400).send({ error: 'Todo not found' })
        }
    } catch (error) {
        res.status(500).send({ error: 'Server Error' })
    }
}

// Deleting the todo
const deletedTodo = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const todo = await Todo.findByPk(id)
        if (todo) {
            await todo.destroy({ where: { id } })
            res.send(todo)
        } else {
            res.status(400).send({ error: 'Todo not found' })
        }
    } catch (error) {
        res.status(500).send({ error: 'Server Error' })
    }
}

module.exports = {getAllTodos, addTodo, updateTodo, deletedTodo}