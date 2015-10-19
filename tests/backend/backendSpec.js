var app = require('./../../app');
var request = require('supertest');
var pg = require('pg');
var query = require('pg-query');

// Functions to start and rollback test database
var set_up = function(){
  query('BEGIN;')
}

var clean_up = function(){
  query('ROLLBACK;')
}

describe('Request to static index page', function(){
  it('returns a 200 status code', function(done){
      request(app).
        get('/').
        expect(200, done);
    });

    it('returns html content-type', function(done){
        request(app).
          get('/').
          expect('Content-Type', /html/i, done);
      });

    it('returns text containing the word todo', function(done){
      request(app).
        get('/').
        expect(/todo/i, done);
    });
});

describe('Request to /items.html', function(){
  it('returns a 301 status', function(done){
      request(app).
        get('/items.html').
        expect(301, done);
  });
});

describe('Request to /items.json', function(){
  it('returns a 200 status', function(done){
      request(app).
        get('/items.json').
        expect(200, done);
  });

  it('returns a json format', function(done){
      request(app).
       get('/items.json').
       expect('Content-Type', /json/i, done);
  });

  it('returns an item containing "meeting"', function(done){
      request(app).
        get('/items.json').
        expect(/meeting/i, done);
  });
});

describe('Post to /items', function(){
  before(set_up);
  after(clean_up);

  var item = {
    'name':'newItem',
    'description':'A new item'
  }

  it('returns a 201 status', function(done){
    request(app).
      post('/items').
      send(item).
      expect(201, done)
  });

  it('returns a 400 status for empty data', function(done){
    request(app).
      post('/items').
      send('').
      expect(400, done);
  });

  it('successfully adds item with name "newItem"', function(done){
    request(app).
      get('/items.json').
      expect(/newItem/i, done);
  });
});

describe('Delete an item', function(){
  before(set_up);
  after(clean_up);

  it('Returns a 200 status code', function(done){
    request(app).
      delete('/items/1').
      expect(200, done);
  });
  it('returns a 400 status if item id not found', function(done){
    request(app).
      delete('/items/200').
      expect(400, done);
  });
});
