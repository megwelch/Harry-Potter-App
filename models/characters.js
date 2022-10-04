/////////////////////////////////////////////////
// Our Schema and Model for the Fruit Resource
/////////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose

// characters Schema
const characterSchema = new Schema({
    name: String,
    age: Number,
    house: String,
    alive: Boolean
})

const Character = model('Character', characterSchema)

module.exports = Character