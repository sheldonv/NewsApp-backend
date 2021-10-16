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
const userRouter = require('./routes/user')
const User = require('./models/User')
const bodyParser = require('body-parser');
const https = require('https')

// connect dotenv to bring environment variables

if(process.env.NODE_ENV === 'development'){
    dotenv.config({path: './config/config.env'})              
}else if(process.env.NODE_ENV === 'production'){
    dotenv.config({path: './config/config.production.env'})              
}

app.use(bodyParser())
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });


// connect mongo database
connectDB()


require('./config/passport')(passport)

// store the logged in user
let user = null;
let id = null;
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
    passport.authenticate('google', { failureRedirect: `${process.env.REACT_APP_FRONTEND_URL}` }),
    function (req, res) {
        // Successful authentication, redirect home.
        user = req.user
        id = req.user._id
        console.log(id)
        res.redirect(`${process.env.REACT_APP_FRONTEND_URL}`);
    });

app.get('/user', (req, res) => {
    User.findOne({_id: id}).then(
        (user) => {
            res.json(user)
        }
    ).catch(
        (error) => {
            res.json({message: 'User Not Found'})
        }
    )
})
// make a router middlewar that lets the user save articles
app.post('/user/save', (req, res) => {
    const article = req.body
    console.log("saved Article",article)
    User.findOneAndUpdate({_id: id}, {$addToSet:{ articles: article}}, {new: true}).then(
        (user) => {
            console.log(user)
            user = user
            res.send(user)
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
})
app.get('/auth/logout', (req, res) => {
    req.logout();
    user = null
    id = null
    res.redirect(`${process.env.REACT_APP_FRONTEND_URL}`)
})
//router for the news Api
app.use('/news', newsRouter)
// router to fetchdata from the Mongo DB
app.use('/users', userRouter)
//app.listen(process.env.PORT || 3000, console.log('connected'))  
//const server = https.createServer(app)
//server.listen(process.env.PORT || 3000, console.log('connected'))  

module.exports = app