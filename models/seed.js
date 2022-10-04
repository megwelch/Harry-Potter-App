///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Character = require('./characters')

///////////////////////////////////////
// Seed Script
///////////////////////////////////////
const db = mongoose.connection

db.on('open', () => {
    const startCharacters = [
        {name: 'Harry Potter', age: 17, house: 'Gryffindor', alive: true},
        {name: 'Dumbledore', age: 150, house: 'Gryffindor', alive: false},
        {name: 'Snape', age: 32, house: 'Slytherin', alive: false},
        {name: 'Ron Weasley', age: 17, house: 'Gryffindor', alive: true},
        {name: 'Luna Lovegood', age: 16, house: 'Ravenclaw', alive: true},
    ]

    Character.deleteMany({})
        .then(deletedCharacters => {
            console.log('this is what .deleteMany returns', deletedCharacters)

            Character.create(startCharacters)
            .then(data => {
                console.log('these are the newly created characters', data)
                db.close()
            })
            .catch(err => {
                console.log(err)
                db.close()
            })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})