/**********************************************************************
* A mongoose schema created to model the journal collection and it's
* endpoints
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/
const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    imageID: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('Journal', journalSchema)