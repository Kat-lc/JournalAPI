/**********************************************************************
* This file contains methods for handling journal entry
* endpoints in the API 
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/

// Require express to be used in the code
const express = require('express')
// Require the use of routers
const router = express.Router()
// Require the mongoose model that was created for Users
const Journal = require('../models/journal')

// Getting all journal entries
router.get('/', async (req, res) => {
    try {
        const journals = await Journal.find()
        res.json(journals);
    } catch (err) {
        res.json({message: err})
    }
})

// Getting a journal entry
router.get('/:id', async (req, res) => {
    try {
        const journal = await Journal.findById(req.params.id)
        res.json(journal)
    } catch (err) {
        res.json({message: err})
    }
})

// Creating a journal entry
router.post('/new', async (req, res) => {
    const journal = new Journal({
        userID: req.body.userID,
        content: req.body.content,
        imageID: req.body.imageID,
        timestamp: req.body.timestamp,
    })
    try{
        const savedJournal = await journal.save()
        res.json(savedJournal)
    } catch(err){
        res.json({message: err})
    }
})

// Updating a journal entry
router.patch('/:id', async (req, res) => {
    const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedJournal) => {
        if (err) return res.status(500).send(err)
        return res.json(updatedJournal)
    })
})

// Deleting a journal entry
router.delete('/:id', async (req, res) => {
    try{
        const removedJournal = await Journal.remove({_id: req.params.id})
        res.json(removedJournal)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router