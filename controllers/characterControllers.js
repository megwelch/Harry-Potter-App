////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Character = require("../models/characters")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

// GET request
router.get('/', (req, res) => {
    Character.find({})
        .then(characters => {
            res.json({characters: characters})
        })
        .catch(err => console.log(err))
})

// POST request
router.post('/', (req, res) => {
    Character.create(req.body)
        .then(character => {
            res.status(201).json({ character: character.toObject() })
        })
        .catch(err => console.log(err))
})

// PUT request
router.put('/:id', (req, res) => {
    const id = req.params.id
    Character.findByIdAndUpdate(id, req.body, {new: true})
        .then(character => {
            console.log('character from update', character)
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Character.findByIdAndRemove(id)
        .then(character => {
            res.sendStatus(204)
        })
        .catch (err => console.log(err))
})

// SHOW request
router.get('/:id', (req, res) => {
    const id = req.params.id
    Character.findById(id)
        .then(character => {
            console.log(character)
            res.json({character: character})
        })
        .catch(err => console.log(err))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router