// backend/api/repos.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to retrieve repos from a Git provider (GitHub example)
async function getReposFromProvider(user) {
    const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
            'Authorization': `token ${user.token}`,  // The token will be in user object after Git OAuth
        }
    });
    return response.data;  // Returning repos
}

// Fetch repositories
router.get('/repos', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Not authenticated');
    }
    try {
        const repos = await getReposFromProvider(req.user);
        res.json(repos);
    } catch (err) {
        res.status(500).send('Error retrieving repositories');
    }
});

// Toggle Auto Review for a repository (pseudo implementation)
router.post('/repos/:repoId/toggle', async (req, res) => {
    const repoId = req.params.repoId;
    // Add logic to toggle Auto Review setting for the repository (using GitHub API as example)
    try {
        await axios.post(`https://api.github.com/repos/${req.user.username}/${repoId}/settings`, {
            autoReview: !req.body.autoReview,
        }, {
            headers: {
                'Authorization': `token ${req.user.token}`,
            },
        });
        res.status(200).send('Auto Review toggled');
    } catch (err) {
        res.status(500).send('Error toggling Auto Review');
    }
});

module.exports = router;
