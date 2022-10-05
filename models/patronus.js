///////////////////////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema } = mongoose

// patronus schema
const patronusSchema = new Schema ({
    creature: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

///////////////////////////////////////////////////////////
// Export Our Schema
///////////////////////////////////////////////////////////
module.exports = patronusSchema