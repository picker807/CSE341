// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel');
require('dotenv').config();

const githubClientID = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

passport.use(new GitHubStrategy({
    clientID: githubClientID,
    clientSecret: githubClientSecret,
    callbackURL: 'https://task-manager-hc4o.onrender.com/auth/github/callback',
    scope: ['user:email', 'read:user'],
    failureRedirect: '/auth/github'

}, (accessToken, refreshToken, profile, done) => {

    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    const username = profile.username;
    const githubId = profile.id;

    User.findOne({ githubId: githubId }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({
                githubId: githubId,
                username: username,
                email: email,
            });
            newUser.save((err) => {
                if (err) {
                    return done(err, false);
                }
                return done(null, newUser);
            });
        }
    });

}));

passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize the user's ID into the session
});

passport.deserializeUser((id, done) => {
    // Retrieve the user from the database based on the ID
    User.findById(id, (err, user) => {
        done(err, user);
    });
});



module.exports = passport;
