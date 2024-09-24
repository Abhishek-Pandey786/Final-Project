// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000; // Set the port number

// Middleware setup
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files from 'public' folder

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected'); // Log success message on successful connection
    })
    .catch(err => {
        console.error('MongoDB connection error:', err); // Log error message on connection failure
    });

// Import routes
const authRoutes = require('./routes/auth'); // Import the auth routes
app.use('/api', authRoutes); // Use the auth routes for all API requests

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log server running message
});
