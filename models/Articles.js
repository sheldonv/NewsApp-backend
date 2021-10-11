const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    author: {type: String, required: false},
    content: {type: String, required: false},
    description: {type: String, required: false},
    publishedAt: {type: String, required: false},
    source: {id: {type: String, required: false}, name:{type: String, required: false}},
    title: {type: String, required: false},
    url: {type: String, required: false},
    url: {type: String, required: false}
})

module.exports = mongoose.model('article', articlesSchema);