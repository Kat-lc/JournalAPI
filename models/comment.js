/**********************************************************************
* A mongoose schema created to model the comment collection and it's
* endpoints
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    journalID: {
        type: String,

    },
    userID: {
        type: String,
 
    },
    content: {
        type: String,
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)