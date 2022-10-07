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
        .populate('patronus.author', 'username')
        .then(characters => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.render('characters/index', {characters, username, loggedIn, userId})
        })
        .catch(err => console.log(err))
})

// GET new character
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('characters/new', { username, loggedIn, userId })
})

// POST request
router.post('/', (req, res) => {
    req.body.alive = req.body.alive === 'on' ? true : false
    req.body.owner = req.session.userId
    Character.create(req.body)
        .then(character => {
            res.redirect('/characters')
        })
        .catch(err => console.log(err))
})

// GET request -- only characters owned by logged in user
router.get('/mine', (req, res) => {
    Character.find({owner: req.session.userId})
    .then(characters => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
    
        res.render('characters/index', { characters, username, loggedIn, userId })
    })
})

// GET request-- show the updates page
router.get('/edit/:id', (req, res) =>{
    res.send('edit page')
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
    Character.findByIdAndRemove(id)
        .then(character => {
            res.redirect('/characters')
        })
        .catch (err => console.log(err))
})

// SHOW request
router.get('/:id', (req, res) => {
    const id = req.params.id
    Character.findById(id)
        .populate('patronus.author', 'username')
        .then(character => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
        
            res.render('characters/show', { character, username, loggedIn, userId })
        })
        .catch(err => console.log(err))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router