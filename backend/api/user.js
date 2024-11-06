// backend/api/user.js
const express = require('express');
const router = express.Router();

// Endpoint to return user information after authentication
router.get('/user', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Not authenticated');
    }
    res.json(req.user);  // Assuming req.user contains authenticated user's details
});

module.exports = router;
