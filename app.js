/* Express app, main file*/
var express = require('express');
var negotiate = require('express-negotiate');
var bodyParser = require('body-parser');
var json = bodyParser.json();
var query = require('pg-query');

var app = express();


// Serve up public directory with angular app
app.use(express.static('public'));

// Database connection string
query.connectionParameters = process.env.DATABASE_URL ||
  "postgres://harry:Stegastes_variabilis@localhost/todo_development"

// More dynamic routes
app.
  get('/items.:format?', function(request, response, next){
      request.negotiate(request.params.format, {
        'application/json': function(){
          query('SELECT * FROM items', function(err, rows){
            if(err) throw err;
            response.json(rows);
          });
        },
        'html': function(){
          response.redirect(301, '/');
        },
        'default': function(){
          response.redirect(301, '/');
        }
      });
    }).
    post('/items', json, function(request, response){
      var newItem = request.body;
      if(!newItem.name || !newItem.description){
        response.sendStatus(400);
        return false;
      } else {
        query('INSERT INTO items (name, description) ' +
        'VALUES ($1, $2)', [newItem.name, newItem.description], function(err){
          if(err) throw err;
          response.sendStatus(201)
        });
      }
    }).
    delete('/items/:id', function(request, response){
      // Get ID
      var id = parseInt(request.params.id);
      // Delete from database
      query('DELETE FROM items WHERE id=$1', [id], function(err, rows, result){
        if(err) throw err;
        if(result.rowCount === 1) {
          response.sendStatus(200)
        } else {
          response.sendStatus(400)
        }
      });
    });

module.exports = app;
