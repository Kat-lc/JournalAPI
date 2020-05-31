/**********************************************************************
* A mongoose schema created to model the image collection and it's
* endpoints
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/
const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    journalID:{
        type: String
    },
    length: {
        type: String,

    },
    filetype: {
        type: String,
 
    },
    bytes: {
        type: String
    }
})

module.exports = mongoose.model('Image', imageSchema)