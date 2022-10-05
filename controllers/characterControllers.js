////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Character = require("../models/characters")
const { populate } = require("../models/user")

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
        .populate('patronus.author', 'username')
        .then(characters => {
            res.json({characters: characters})
        })
        .catch(err => console.log(err))
})

// POST request
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    Character.create(req.body)
        .then(character => {
            res.status(201).json({ character: character.toObject() })
        })
        .catch(err => console.log(err))
})

// GET request -- only characters owned by logged in user
router.get('/mine', (req, res) => {
    Character.find({owner: req.session.userId})
    .then(characters => {
        res.status(200).json({characters: characters})
    })
})

// PUT request
router.put('/:id', (req, res) => {
    const id = req.params.id
    Character.findById(id)
        .then(character => {
            if(fruit.owner == req.session.userId){
                res.sendStatus(204)
                return character.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .catch(err => console.log(err))
})

// DELETE request
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Character.findById(id)
        .then(character => {
            if(character.owner == req.session.userId){
                res.sendStatus(204)
                return character.deleteOne()
            } else {
                res.sendStatus(401)
            }
        })
        .catch (err => console.log(err))
})

// SHOW request
router.get('/:id', (req, res) => {
    const id = req.params.id
    Character.findById(id)
        .populate('patronus.author', 'username')
        .then(character => {
            res.json({character: character})
        })
        .catch(err => console.log(err))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router