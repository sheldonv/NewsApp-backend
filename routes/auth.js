const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.REACT_APP_FRONTEND_URL}` }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(`${process.env.REACT_APP_FRONTEND_URL}`);
    });//change

module.exports = authRouter;