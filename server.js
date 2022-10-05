/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV Variables
const express = require('express') // import express
const path = require('path') // import path module
// const Character = require('./models/characters')
const CharacterRouter = require('./controllers/characterControllers')
const UserRouter = require('./controllers/userControllers')
const PatronusRouter = require('./controllers/patronusControllers')
const middleware = require('./utils/middleware')

/////////////////////////////////////////////
// Create Our Express Application Object
/////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////
middleware(app)

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('server is running')
})

/////////////////////////////////////////////
// Register our Routes
/////////////////////////////////////////////
app.use('/characters', CharacterRouter)
app.use('/patronus', PatronusRouter)
app.use('/users', UserRouter)

/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))


