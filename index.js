/**********************************************************************
* A REST API that manages a quarantine journal system. This API 
* manages users, entries, images, comments, and locations.
*
* Author: Katie Cussans
* Version: Spring 2020
* ********************************************************************/

// Require the .env file to store uri for MongoDB to protect password
require('dotenv').config()

// Load the express library
const express = require('express')
// Create an instance of an express app
const app = express()
// Run on this port
const port = 8080
// Load mongoose
const mongoose = require('mongoose')
// MongoDB credentials pulled from a .env file
const uri = process.env.MONGO_URI;
// Create a variable to hold our db connection
let connection;

// Tell the app to use the builtin JSON parser
app.use(express.json());

// Tell the app to decode urls for us (so we can pass
// values in the URL such as "users/1")
app.use(express.urlencoded({ extended: true }))

// Load in routers for collections
const userRoutes = require('./routes/users')
const journalRoutes = require('./routes/journals')
const imageRoutes = require('./routes/images')
const commentRoutes = require('./routes/comments')
const locationRoutes = require('./routes/locations')

app.use('/users', userRoutes)
app.use('/journals', journalRoutes)
app.use('/images', imageRoutes)
app.use('/comments', commentRoutes)
app.use('/locations', locationRoutes)

// Connect to the db; start listening if successful.
mongoose.connect(uri, { useNewUrlParser: true}).then(() => {
	console.log("Connected to database.")
	app.listen(port, () => console.log(`Begin; Listening on port ${port}`))
}).catch(error => {
	console.log("Could not connect. Exiting now...", error)
	process.exit();
})

// Catch when a user hits Ctrl-C.  Shutdown the database
// cleanly before exiting.
process.on('SIGINT', () => {
	connection.close();
	process.exit();
});