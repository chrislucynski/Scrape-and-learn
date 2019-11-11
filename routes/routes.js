const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const path = require('path')

// Routes
module.exports = function(app) {
  app.get("/", (req, res) => {
    // console.log("Oh shit, it's working...It's WORKING!" + req.body)
    db.Article.find({saved: false}).then(dbArticle => {
      // console.log(dbArticle)
      res.render("home", { article: dbArticle });
    });
  });

  // A GET route for scraping the echoJS website
  app.get("/scrape", function(req, res) {
    axios
      .get("https://www.nurse.com/blog/category/nursing-news/")
      .then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // console.log(response.data)
        // console.log(articleData)
        
        // $("h2.title").each(element => console.log(element.first().text()))
        // $(".title > a").each(() => console.log($(this).first().text()))
        
        let articleData = $(".fusion-post-content-wrapper");
        articleData.each(function(i, element) {
          var result = {};
          result.headline = $(this)
            .children(".fusion-post-content")
            .children("h2")
            .text();
          result.summary = $(this)
            .children(".fusion-post-content")
            .children(".fusion-post-content-container")
            .children("p")
            .text();
          result.URL = $(this)
            .children(".fusion-post-content")
            .children("h2")
            .children("a")
            .attr("href");

          console.log(result);

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
               .then(dbArticle => console.log(dbArticle))
               .catch(err => console.log(err));
        });
        res.redirect('/');
      })
      .catch(err => res.json(err));
  });

  // Route for getting all saved from the db
  app.get("/saved", (req, res) => {
    // TODO: Finish the route so it grabs all of the saved
    db.Article.find({saved: true})
      .then(dbArticle => {
      console.log(dbArticle);
      res.render("saved", { article: dbArticle });

        // res.send(dbArticle);
      })
      .catch(err => res.json(err));
  });

  // Route for grabbing a specific Article by id, populate it with it's comment
  app.put("/saved/:id", function(req, res) {
    // finds one article using the req.params.id, and run the populate method
    // with "comment", then responds with the article with the comment included
    db.Article.updateOne({ _id: req.params.id }, {$set: {saved: true}})
      // .populate('comment')
      .then(dbArticle => {
        console.log(dbArticle)
        res.render("home", { article: dbArticle });
      })
      .catch(err => res.sendStatus(500));
  });

  app.put("/unsaved/:id", function(req, res) {
    db.Article.updateOne({ _id: req.params.id }, {$set: {saved: false}})
      .then(dbArticle => {
        console.log(dbArticle)
        res.render("saved", { article: dbArticle });
      })
      .catch(err => res.sendStatus(500));
  });

  app.delete('/delete', (req,res) => {
    db.Article.deleteMany({})
    .then(dbArticle => {
      console.log(dbArticle)
      res.render("home", { article: dbArticle });
    })
    .catch(err => res.sendStatus(500));
  })

  app.get("/css/style.css", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "css", "style.css"));
});
};
