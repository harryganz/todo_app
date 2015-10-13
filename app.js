/* Express app, main file*/
var express = require('express');
var negotiate = require('express-negotiate');
var bodyParser = require('body-parser');
var json = bodyParser.json();

var app = express();


// Serve up public directory with angular app
app.use(express.static('public'));

// Temporary items list
// TODO add persistance
var max_id = 0;
var items = [
  {'name':'Meeting', 'description':'Meeting with city council',
  'id': ++max_id},
  {'name':'Dr. Appointment', 'description':'Appointment with Dr. Gordon',
  'id': ++max_id}
];

// More dynamic routes
app.
  get('/items.:format?', function(request, response, next){
      request.negotiate(request.params.format, {
        'application/json': function(){
          response.json(items);
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
        items.push({'name': newItem.name, 'description': newItem.description,
      'id': ++max_id});

        response.status(201).json(newItem.id);
      }
    }).
    delete('/items/:id', function(request, response){
      // Get ID
      var id = parseInt(request.params.id);
      // Find index
      var index = items.map(function(x){
        return x.id;
      }).indexOf(id);
      // If index exists, delete it
      if(index > -1){
        items.splice(index, 1);
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    });

module.exports = app;
