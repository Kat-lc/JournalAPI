/**********************************************************************
* This file contains methods for handling User endpoints in the API 
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/

// Require express to be used in the code
const express = require('express')
// Require the use of routers
const router = express.Router()
// Require the mongoose model that was created for Users
const User = require('../models/user')

// Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (err) {
        res.json({message: err})
    }
})

// Getting one user
router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        res.json(users)
    } catch (err) {
        res.json({message: err})
    }
})

// Creating one user
router.post('/new', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        dateJoined: req.body.dateJoined,
        admin: req.body.admin
    })
    try{
        const savedUser = await user.save()
        res.json(savedUser)
    } catch(err){
        res.json({message: err})
    }
})

// Updating one user
router.patch('/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        if (err) return res.status(500).send(err)
        return res.json(updatedUser)
    })
})

// Deleting one user
router.delete('/:id', async (req, res) => {
    try{
        const removedUser = await User.remove({_id: req.params.id})
        res.json(removedUser)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router