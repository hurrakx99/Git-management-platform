// backend/server.js
const express = require('express');
const passport = require('passport');
const authRoutes = require('./auth');
const userRoutes = require('./api/user');
const repoRoutes = require('./api/repos');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Passport middleware for authentication
app.use(passport.initialize());

// Routes
app.use(authRoutes);
app.use('/api', userRoutes);
app.use('/api', repoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
