require('dotenv').config()
const { Category } = require('./models/Category')
const { Todo } = require('./models/Todo')

Category.hasMany(Todo)
Todo.belongsTo(Category)
const seedDb = async () => {
    try {
        //creating the categories
        const cat1 = await Category.create({ text: 'Work' })
        const cat2 = await Category.create({ text: 'Personal' })

        // Create todos with foreign key references to categories
        await Todo.create({ CategoryId: cat1.id, text: 'Finish project', completed: false })
        await Todo.create({ CategoryId: cat1.id, text: 'Prepare video for project', completed: false })
        await Todo.create({ CategoryId: cat1.id, text: 'Write a script for video', completed: false })

        await Todo.create({ CategoryId: cat2.id, text: 'Go for a walk', completed: false })
        await Todo.create({ CategoryId: cat2.id, text: 'Buy groceries', completed: false })
        await Todo.create({ CategoryId: cat2.id, text: 'Call mom', completed: false })

        console.log('Database seeded successfully')
    } catch (error) {
        console.error('Error seeding database:', error)
    }
}
 seedDb()

/*const seedDb = async () => {
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

} */