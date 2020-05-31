/**********************************************************************
* This file contains methods for handling Comment endpoints in the API 
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/

// Require express to be used in the code
const express = require('express')
// Require the use of routers
const router = express.Router()
// Require the mongoose model that was created for Users
const Comment = require('../models/comment')

// Getting all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find()
        res.json(comments);
    } catch (err) {
        res.json({message: err})
    }
})

// Getting one comment
router.get('/:id', async (req, res) => {
    try {
        const comments = await Comment.findById(req.params.id)
        res.json(comments)
    } catch (err) {
        res.json({message: err})
    }
})

// Creating one comment
router.post('/new', async (req, res) => {
    const comment = new Comment({
        journalID: req.body.journalID,
        userID: req.body.userID,
        content: req.body.content,
        dateTime: req.body.dateTime
    })
    try{
        const savedComment = await comment.save()
        res.json(savedComment)
    } catch(err){
        res.json({message: err})
    }
})

// Updating one comment
router.patch('/:id', async (req, res) => {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedComment) => {
        if (err) return res.status(500).send(err)
        return res.json(updatedComment)
    })
})

// Deleting one comment
router.delete('/:id', async (req, res) => {
    try{
        const removedComment = await Comment.remove({_id: req.params.id})
        res.json(removedComment)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router