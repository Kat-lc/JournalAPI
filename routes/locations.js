/**********************************************************************
* This file contains methods for handling Location endpoints in the API 
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/

// Require express to be used in the code
const express = require('express')
// Require the use of routers
const router = express.Router()
// Require the mongoose model that was created for Users
const Location = require('../models/location')

// Getting all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find()
        res.json(locations);
    } catch (err) {
        res.json({message: err})
    }
})

// Getting one location
router.get('/:id', async (req, res) => {
    try {
        const locations = await Location.findById(req.params.id)
        res.json(locations)
    } catch (err) {
        res.json({message: err})
    }
})

// Creating one location
router.post('/new', async (req, res) => {
    const location = new Location({
        journalID: req.body.journalID,
        coordinates: req.body.coordinates,
        name: req.body.name
    })
    try{
        const savedLocation = await location.save()
        res.json(savedLocation)
    } catch(err){
        res.json({message: err})
    }
})

// Updating one location
router.patch('/:id', async (req, res) => {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedLocation) => {
        if (err) return res.status(500).send(err)
        return res.json(updatedLocation)
    })
})

// Deleting one location
router.delete('/:id', async (req, res) => {
    try{
        const removedLocation = await Location.remove({_id: req.params.id})
        res.json(removedLocation)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router