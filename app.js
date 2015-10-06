/* Express app, main file*/
var express = require('express');

var app = express();

// Serve up public directory with angular app
app.use(express.static('public'));

module.exports = app;
