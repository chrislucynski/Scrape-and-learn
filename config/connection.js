// Connect to the Mongo DB
const mongoose = require("mongoose");

// mLab info from sign-up:
// mongolab-contoured-01510 as MONGODB_URI


// mongoose.connect('mongodb://localhost/scrapeApp', {useNewUrlParser: true});
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeApp";
var db = mongoose.connect(MONGODB_URI);
console.log(MONGODB_URI)
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// });

module.exports = db;