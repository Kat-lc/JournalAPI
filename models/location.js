/**********************************************************************
* A mongoose schema created to model the location collection and it's
* endpoints
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/
const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    journalID: {
        type: String
    },
    coordinates: {
        type: String
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model('Location', locationSchema)