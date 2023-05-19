require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT, CONNECTION_STRING } = process.env
const { Sequelize } = require('sequelize')

const todos  = require('./controllers/controller')
const { Todo } = require('./models/Todo')
const { Category } = require('./models/Category')

app.use(express.json())
app.use(cors())

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

sequelize
.authenticate()
.then(() => {
    console.log('Database connection has been established')
})
.catch((err) => {
    console.error('Unable to connect to database', err)
})

//Define association to sequelize elements
Todo.belongsTo(Category)
Category.hasMany(Todo)

// Sync models with db
sequelize.sync().then(async () => {
    console.log('Models are in sync')

    //This will seed the db with sample data
    await Category.sync({ force: true })
    await Todo.sync({ force: true })
    await require('./seed')
})


//Get todos
app.get('/todos', todos.getAllTodos)//? can I do this******

//Add new todo
app.post('/todos', todos.addTodo)
app.post('/todos', async (req, res) => {
    const { text } = req.body

    if (text.trim() !== '') {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
        }

        todos.push(newTodo)
        res.status(200).send(newTodo)
    } else {
        res.status(400).send({ error: 'Text cannot be empty' })
    }
})

// updating todo
app.put('/todos/:id', todos.updateTodo)
app.put('/todos/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const { completed } = req.body

    try {
        const todo = await Todo.findByPk(id)

        if (todo) {
            await todo.update({ completed })
            res.send(todo)
        } else {
            res.status(400).send({ error: 'Todo not found' })
        }
    } catch (error) {
        console.error('Error updating todo:', error)
        res.status(500).send({ error: 'Failed to update todo'})
    }
})

// Delete a todo
app.delete('/todos/:id', todos.deletedTodo)
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = todos.findIndex((todos) => todos.id === id)

    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1)[0]
        res.send(deletedTodo)
    } else {
        res.status(400).send({ error: 'Todo not found'})
    }
})

app.listen(SERVER_PORT, () => {
    console.log(`running on port ${SERVER_PORT}`)
})