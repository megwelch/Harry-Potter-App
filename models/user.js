///////////////////////////////////////
// Import Our Dependencies
///////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose

///////////////////////////////////////
// Define Our User Schema
///////////////////////////////////////
const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)

///////////////////////////////////////
// Export Our Model
///////////////////////////////////////
module.exports = User