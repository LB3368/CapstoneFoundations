require('dotenv').config({ path: "../../.env" })
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')
//const seedDb = require('../seed')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = { sequelize }

/*const { CONNECTION_STRING } = require('dotenv').config().parsed
const Sequelize = require('sequelize')
const seedDb = require('../seed')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        },
    },
})*/


//seedDb()
/*sequelize.sync({ force: false }).then(async () => {
    console.log('Models are in sync')

    //seed the database
    await seedDb()

    //changes to the models
    /*sequelize.on('change:all', async () => {
        console.log('Models have changed')

        // sync the database
        await sequelize.sync({ force: false })
    })

}).catch((error) => {
    console.error('Error syncing models:', error)
})
*/
