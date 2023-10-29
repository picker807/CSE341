const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    const authenticatedUser = req.user;

    res.json(authenticatedUser);
    res.redirect('/');
});

/* // Local login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redirect on success
    failureRedirect: '/', // Redirect on failure
    failureFlash: true // Enable flash messages for login failures
})); */

// Logout route
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {
            console.error(err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
}); 


module.exports = router;