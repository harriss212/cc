// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// Creating an Express application
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Importing routes
const postsRoute = require('./routes/posts');
const filmsRoute = require('./routes/films');

// Using the bodyParser middleware for JSON parsing
app.use('/posts', postsRoute);
app.use('/films', filmsRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Homepage');
});

// MongoDB connection details
// Replace the placeholder values with your actual MongoDB credentials and database name
const MONGODB_USER = 'hahmed20';
const MONGODB_PASSWORD = '1234';
const MONGODB_CLUSTER = 'cluster0.s8utdao.mongodb.net';
const MONGODB_DATABASE = 'MiniFilms';

// Constructing the MongoDB connection URL using the credentials and database name
const MURL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}`;

// Connecting to MongoDB using Mongoose
mongoose.connect(MURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    // Successful connection
    console.log('Your MongoDB connector is on...');
    
    // Starting the Express server after successfully connecting to MongoDB
    app.listen(3001, () => {
        console.log('Your server is up and running...');
    });
})
.catch((error) => {
    // Error handling if the connection to MongoDB fails
    console.error('Error connecting to MongoDB:', error);
});
