require('dotenv').config()


const { Category } = require('./models/Category')
const { Todo } = require('./models/Todo')



const seedDb = async () => {
    //create a category for todo list
    const cat1 = await Category.create({ name: 'Personal' })
    const cat2 = await Category.create({ name: 'Work' })

    //Now create todos
    await Todo.create({
        text: 'Finish homework',
        completed: false,
        CategoryId: cat1.id,
    })

    await Todo.create({
        text: 'Send report',
        completed: false,
        CategoryId: cat2.id,
    })

    await Todo.create({
        text: 'Go for a run',
        completed: true,
        CategoryId: cat1.id,
    })
    console.log('Database seeded')

} 

seedDb()