////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Character = require("../models/characters")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:characterId", (req, res) => {
    const characterId = req.params.characterId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    Character.findById(characterId)
        .then(character => {
            character.patronus.push(req.body)
            return character.save()
        })
        .then(character => {
            res.status(200).json({ character: character })
        })
        .catch(error => console.log(error))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:characterId/:patronusId', (req, res) => {
    const characterId = req.params.characterId 
    const patronusId = req.params.patronusId
    Character.findById(characterId)
        .then(character => {
            const thePatronus = character.patronus.id(patronusId)
            console.log('this is the patronus that was found', thePatronus)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (thePatronus.author == req.session.userId) {
                    thePatronus.remove()
                    res.sendStatus(204)
                    return character.save()
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        })
        // send an error if error
        .catch(error => console.log(error))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router