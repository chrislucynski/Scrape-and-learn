const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require('../models')
// const path = require('path')

// Routes
module.exports = function (app){
  app.get('/', (req, res) => {
    // console.log("Oh shit, it's working...It's WORKING!" + req.body)
    db.Article.find({})
    .then(dbArticle => {
    // console.log(dbArticle)
    res.render("home", { article: dbArticle })  
    })
      
    
  })

    // A GET route for scraping the echoJS website
  app.get("/scrape", function(req, res) {
      axios.get("https://www.npr.org/sections/news/")
      .then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // console.log(response.data)
        // let articleData = $("h2.title")
        // console.log(articleData)
        var result = {};
        // $("h2.title").each(element => console.log(element.first().text()))
       
        $(".title > a").each(() => console.log($(this).first().text()))

        // articleData.each(function(i, element) {
        //   result.headline = $(this)
        //     .children("h2")
        //     .text();
        //   result.summary = $(this)
        //     .children("p")
        //     .text();
        //   result.link = $(this)
        //     .children("a")
        //     .attr("href");
          
        //     console.log(result)

            res.render(result);
        //   // Create a new Article using the `result` object built from scraping
        //   // db.Article.create(result)
        //   //   .then(dbArticle => console.log(dbArticle))
        //   //   .catch(err => console.log(err));
        // });
      })
      .catch(err => res.json(err))
  });
    
  // Route for getting all Articles from the db
  app.get("/articles", (req, res) => {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
      .then(dbArticle => {
        
        console.log(dbArticle)
        res.send(dbArticle)
      })
      .catch(err => res.json(err))
  });
    
  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
  // finds one article using the req.params.id, and run the populate method 
  // with "note", then responds with the article with the note included
  db.Article.findOne({_id: req.params.id})
      // .populate('note')
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.sendStatus(500))
  });

}


