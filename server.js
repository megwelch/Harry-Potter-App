/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV Variables
const express = require('express') // import express
const path = require('path') // import path module
const CharacterRouter = require('./controllers/characterControllers')
const UserRouter = require('./controllers/userControllers')
const PatronusRouter = require('./controllers/patronusControllers')
const middleware = require('./utils/middleware')

/////////////////////////////////////////////
// Create Our Express Application Object
/////////////////////////////////////////////
const app = require('liquid-express-views')(express())

/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////
middleware(app)

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('index.liquid')
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