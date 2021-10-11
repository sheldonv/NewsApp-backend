const express = require('express');
const newsRouter = express.Router();
const got = require('got');
const mongoose = require('mongoose')
const User = require('../models/User')
const Article = require('../models/Articles');

newsRouter.get('/search', (req, res, next) => {
   (async () => {
       try {
            const query = req.query.query
            const response = await got(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.API_KEY}`)
            res.send(response.body)
        } catch (error) {
            console.log(error)
            res.json(error)
       }
   })();
})
newsRouter.get('/headlines', (req, res, next) => {
    (async () => {
        try {
            const response = await got(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`);
            console.log(response.body);
            res.send(response.body)
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    })();
})
//function to updateCategories and Initiate Dashboard
newsRouter.get('/categories', (req, res) => {
    const categories = {
       categories: req.query.categories
    }
    const id = req.query.id
    console.log(categories, id)
    User.findOneAndUpdate({_id: id}, {...categories}, {new: true}).then(
        (user) => {
            if(!user){
                return res.json({message: 'User Does not Exist'})
            }else{
                console.log(user)
                return res.json(user)
            }
        }
    ).catch(
        (error) => {
            res.json({
                error: error
            })
        }
    )
})
// creating a express router Get request function to get data on certian category
newsRouter.get('/category', (req, res) => {
    const category = req.query.category;
    (async () => {
        try {
            console.log("fetch category",category)
            const response = await got(`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${category}&apiKey=${process.env.API_KEY}`);
            console.log(response.body);
            res.send(response.body)  
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    })();
})
newsRouter.post('/save', (req, res) => {
    console.log('save', req.body)  

    const article = new Article({
        author: req.body.author,
        content: req.body.content,
        description: req.body.description,
        publishedAt: req.body.publishedAt,
        source: {
            id: req.body.source.id,
            name: req.body.source.name
        }, 
        title: req.body.title,
        url: req.body.url, 
        urlToImage: req.body.urlToImage 
    })
    
    article.save().then(
        (article) => {
            console.log(article)
            res.send(article)
        }
    ).catch(
        (error) => {
            console.error(error)
        }
    )
})
 
module.exports = newsRouter;