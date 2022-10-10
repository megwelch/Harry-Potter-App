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
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Character.find({})
        .populate("patronus.author", "username")
        .then(characters => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // console.log(fruits)
            // this is fine for initial testing
            // res.send(fruits)
            // this the preferred method for APIs
            // res.json({ fruits: fruits })
            // here, we're going to render a page, but we can also send data that we got from the database to that liquid page for rendering
            res.render('characters/index', { characters, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
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
    console.log('the fruit from the form', req.body)
    Character.create(req.body)
        .then(character => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // send the user a '201 created' response, along with the new fruit
            // res.status(201).json({ fruit: fruit.toObject() })
            res.redirect('/characters')
            // res.render('fruits/show', { fruit, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
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
    .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request-- show the updates page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const fruitId = req.params.id

    Character.findById(characterId)
        // render the edit form if there is a fruit
        .then(character => {
            res.render('characters/edit', { character, username, loggedIn, userId })
        })
        // redirect if there isn't
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
    // res.send('edit page')
})

// PUT request
router.put('/:id', (req, res) => {
    const id = req.params.id
    req.body.alive = req.body.alive === 'on' ? true : false
    Character.findById(id)
        .then(character => {
            if(fruit.owner == req.session.userId){
                return character.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            // console.log('returned from update promise', data)
            res.redirect(`/characters/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE request
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Character.findByIdAndRemove(id)
        .then(character => {
            res.redirect('/characters')
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
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
        .catch(err => res.redirect(`/error?error=${err}`))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router