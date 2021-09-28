const mongoose = require('mongoose');

// Create a the mongoose schema for the user profile
const userSchema = mongoose.Schema({
    googleId: {type: String , required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    displayName: {type: String, required: true},
    imageUrl: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema);