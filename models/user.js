/**********************************************************************
* A mongoose schema created to model the user collection and it's
* endpoints
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: String,
        
    }
})

module.exports = mongoose.model('User', userSchema)