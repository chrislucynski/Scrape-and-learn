const express = require("express");
const logger = require("morgan");
const exhb = require('express-handlebars')
const routes = require('./routes/routes')

// Require all models
// var db = require("./models");
// import {routes} from './routes/routes'; 

var PORT = 3000;
var app = express();

require('./routes/routes')(app)

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
  console.log("Come watch at http://localhost:" + PORT + "!");
});
