var app = require('./../../app');
var request = require('supertest');

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
