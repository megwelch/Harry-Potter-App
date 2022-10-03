
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require("mongoose") // import mongoose
const path = require("path") // import path module

/////////////////////////////////////////////
// Import Our Models
/////////////////////////////////////////////
const Character = require('./models/harry-potter')

/////////////////////////////////////////////
// Databse Connection
/////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
// here is out DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// establish our connection
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do with cerain events
// opens, disconnects, and errors
mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('disconnected from mongoose'))
    .on('error', (error) => console.log('an error occurred \n', error))

/////////////////////////////////////////////
// Create Our Express Application Object
/////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use(express.json())

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('server is running')
})

// seed script
app.get('/characters/seed', (req, res) => {
    const startCharacters = [
        {name: 'Harry Potter', age: 17, house: 'Gryffindor', alive: true},
        {name: 'Dumbledore', age: 150, house: 'Gryffindor', alive: false},
        {name: 'Snape', age: 32, house: 'Slytherin', alive: false},
        {name: 'Ron Weasley', age: 17, house: 'Gryffindor', alive: true},
        {name: 'Luna Lovegood', age: 16, house: 'Ravenclaw', alive: true},
    ]

    Character.deleteMany({})
        .then(() => {
            Character.create(startCharacters)
            .then(data => {
                res.json(data)
            })
        })
        .catch(err => console.log(err))
})

// GET request
app.get('/characters', (req, res) => {
    Character.find({})
        .then(characters => {
            res.json({characters: characters})
        })
        .catch(err => console.log(err))
})

// POST request
app.post('/characters', (req, res) => {
    Character.create(req.body)
        .then(character => {
            res.status(201).json({ character: character.toObject() })
        })
        .catch(err => console.log(err))
})

// PUT request
app.put('/characters/:id', (req, res) => {
    const id = req.params.id
    Character.findByIdAndUpdate(id, req.body, {new: true})
        .then(character => {
            console.log('character from update', character)
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
app.delete('/characters/:id', (req, res) => {
    const id = req.params.id
    Character.findByIdAndRemove(id)
        .then(character => {
            res.sendStatus(204)
        })
        .catch (err => console.log(err))
})

// SHOW request
app.get('/characters/:id', (req, res) => {
    const id = req.params.id
    Character.findById(id)
        .then(character => {
            console.log(character)
            res.json({character: character})
        })
        .catch(err => console.log(err))
})


/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))


