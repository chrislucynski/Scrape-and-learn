const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require('../config/connection')

// Routes
module.exports = function (app){
  app.get('/', (req, res) => {
    console.log("Oh shit, it's working...It's WORKING!" + req.body)
    res.send("Oh shit, it's working...It's WORKING!")
  })
  // A GET route for scraping the echoJS website
  app.get("/scrape", function(req, res) {
      // First, we grab the body of the html with axios
      axios.get("http://www.echojs.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
    
        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function(i, element) {
          // Save an empty result object
          var result = {};
    
          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");
    
          // Create a new Article using the `result` object built from scraping
        //   db.Article.create(result)
        //     .then(dbArticle => console.log(dbArticle))
        //     .catch(err => console.log(err));
        res.send(result);
        });
    
        // Send a message to the client
      });
  });
    
  // Route for getting all Articles from the db
  app.get("/articles", (req, res) => {
  // TODO: Finish the route so it grabs all of the articles
  db.article.find({})
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err))
  });
    
  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
  db.article.findOne({_id: req.params.id})
      .populate('note')
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.sendStatus(500))
  });

}


