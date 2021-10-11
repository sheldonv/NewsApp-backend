const mongoose = require('mongoose');

// Create a the mongoose schema for the user profile
const userSchema = mongoose.Schema({
    googleId: {type: String , required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    displayName: {type: String, required: true},
    imageUrl: {type: String, required: true},
    firstVisit: {type: Boolean, default: true},
    dashboardInit: {type: Boolean, default: false},
    categories: {type: String, default: null},
    createdAt: {type: Date, default: Date.now},
    articles: [Object]
})

module.exports = mongoose.model('User', userSchema);