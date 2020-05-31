/**********************************************************************
* This file contains methods for handling Image endpoints in the API 
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/

// Require express to be used in the code
const express = require('express')
// Require the use of routers
const router = express.Router()
// Require the mongoose model that was created for Users
const Image = require('../models/image')

// Getting all images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find()
        res.json(images);
    } catch (err) {
        res.json({message: err})
    }
})

// Getting one image
router.get('/:id', async (req, res) => {
    try {
        const images = await Image.findById(req.params.id)
        res.json(images)
    } catch (err) {
        res.json({message: err})
    }
})

// Creating one image
router.post('/new', async (req, res) => {
    const image = new Image({
        journalID: req.body.journalID,
        length: req.body.length,
        filetype: req.body.filetype,
        bytes: req.body.bytes
    })
    try{
        const savedImage = await image.save()
        res.json(savedImage)
    } catch(err){
        res.json({message: err})
    }
})

// Updating one image
router.patch('/:id', async (req, res) => {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedImage) => {
        if (err) return res.status(500).send(err)
        return res.json(updatedImage)
    })
})

// Deleting one image
router.delete('/:id', async (req, res) => {
    try{
        const removedImage = await Image.remove({_id: req.params.id})
        res.json(removedImage)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router