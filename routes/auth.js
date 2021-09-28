const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/dashboard');
    });

module.exports = authRouter;