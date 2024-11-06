// backend/passport-config.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
const BitbucketStrategy = require('passport-bitbucket').Strategy;

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
    profile.token = accessToken;  // Store the access token in the profile object
    return done(null, profile);
}));

// GitLab Strategy
passport.use(new GitLabStrategy({
    clientID: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/gitlab/callback',
}, (accessToken, refreshToken, profile, done) => {
    profile.token = accessToken;
    return done(null, profile);
}));

// Bitbucket Strategy
passport.use(new BitbucketStrategy({
    clientID: process.env.BITBUCKET_CLIENT_ID,
    clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/bitbucket/callback',
}, (accessToken, refreshToken, profile, done) => {
    profile.token = accessToken;
    return done(null, profile);
}));

// Serialize and deserialize user to handle session
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
