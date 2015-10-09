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
