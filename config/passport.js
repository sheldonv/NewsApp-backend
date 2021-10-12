const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            let newUser = {
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                imageUrl: profile.photos[0].value,
            }
            User.findOneAndUpdate({googleId: profile.id}, {...newUser, firstVisit: false}, {new: true}).then(
                (user) => {
                    if(user){
                        console.log(user);
                        done(null, user)
                    }else{
                        User.create(newUser).then(
                            (user) => {
                                console.log(user)
                                done(null, user)
                            }
                        )
                       
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
        }
    ));
 
    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            return done(err, user);
        });
    });
}
