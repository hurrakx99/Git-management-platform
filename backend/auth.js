// backend/auth.js
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
const BitbucketStrategy = require('passport-bitbucket').Strategy;

const router = express.Router();

// Configure GitHub authentication strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
    profile.token = accessToken;  // Attach token to the profile
    return done(null, profile);
}));

// Configure GitLab authentication strategy
passport.use(new GitLabStrategy({
    clientID: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/gitlab/callback"
}, (accessToken, refreshToken, profile, done) => {
    profile.token = accessToken;  // Attach token to the profile
    return done(null, profile);
}));

// Configure Bitbucket authentication strategy
passport.use(new BitbucketStrategy({
    clientID: process.env.BITBUCKET_CLIENT_ID,
    clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/bitbucket/callback"
}, (accessToken, refreshToken, profile, done) => {
    profile.token = accessToken;  // Attach token to the profile
    return done(null, profile);
}));

// Route to initiate authentication for a provider
router.get('/auth/:provider', (req, res) => {
    const provider = req.params.provider;
    passport.authenticate(provider)(req, res);
});

// Callback route after authentication for each provider
router.get('/auth/:provider/callback', (req, res, next) => {
    const provider = req.params.provider;
    passport.authenticate(provider, {
        successRedirect: '/profile',
        failureRedirect: '/'
    })(req, res, next);
});

module.exports = router;
