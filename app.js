const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session'); 
const authRouter = require('./routes/auth');
const cors = require('cors')
const newsRouter = require('./routes/news')
// connect dotenv to bring environment variables
dotenv.config({path: './config/config.env'})              

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*'

}));

// connect mongo database
connectDB()


require('./config/passport')(passport)

// store the logged in user
let user = null;

// initiate express sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

// intiate passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app.use('/auth', authRouter)

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3001/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        user = req.user
        res.redirect('http://localhost:3001/');
    });

app.get('/user', (req, res) => {
    if(user){
        res.status(200).json(user)
    }
})
app.get('/auth/logout', (req, res) => {
    req.logout();
    user = null
    res.redirect('http://localhost:3001')
})
app.use('/news', newsRouter)
app.listen(3000, console.log('connected'))    