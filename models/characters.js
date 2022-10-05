/////////////////////////////////////////////////
// Our Schema and Model for the Fruit Resource
/////////////////////////////////////////////////
const mongoose = require('./connection')
const User = require('./user')
const patronusSchema = require('./patronus')

const { Schema, model } = mongoose

// characters Schema
const characterSchema = new Schema({
    name: String,
    age: Number,
    house: String,
    alive: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patronus: [patronusSchema]
}, { timestamps: true })

const Character = model('Character', characterSchema)

module.exports = Character