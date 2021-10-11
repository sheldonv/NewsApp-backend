const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

userRouter.get('/dashboardinit', (req, res) => {
    const id = req.query.id
    console.log("id", id)
    const dashboardInit = {
        dashboardInit: true 
    }
    User.findOneAndUpdate({_id: id}, {...dashboardInit} , {new: true}).then(
        (user) => {
            res.json(user)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
})

module.exports = userRouter