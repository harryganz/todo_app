/* Express app, main file*/
var express = require('express');
var negotiate = require('express-negotiate');

var app = express();

// Serve up public directory with angular app
app.use(express.static('public'));

// Temporary items list
// TODO add persistance
var max_id = 0;
var items = [
  {'name':'Meeting', 'description':'Meeting with city council',
  'id':++max_id},
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
  });


module.exports = app;
