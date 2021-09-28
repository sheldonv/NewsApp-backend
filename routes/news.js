const express = require('express');
const newsRouter = express.Router();
const got = require('got');

newsRouter.get('/everything/query', (req, res, next) => {
   (async () => {
       try {
            const {body} = await got(`${process.env.NEWS_API_EVERYTHING} + &q= + ${query} + &sortBy=popularity + &apiKey= + ${process.env.API_KEY}`)
            res.json(body)
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

module.exports = newsRouter;