const express = require("express");
const logger = require("morgan");
const exphbs = require('express-handlebars')
const mongoose = require("mongoose");

// var db = require("./models");
// import {routes} from './routes/routes'; 

const PORT = process.env.PORT || 3000;
const app = express();


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeApp";
const db = mongoose.connect(MONGODB_URI);

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./routes/routes')(app)
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
  console.log("Come watch at http://localhost:" + PORT + "!");
});
