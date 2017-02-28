'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');

describe('Basic Server Routes/Endpoints', function () {
  var guitar = null;

  describe('Invalid routes will return a 404 status', function() {
    it('should return a 404', function(done) {
      request.get('localhost:3000/dumb/request')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST: /api/guitar', function() {
    it('A POST request with valid params should return 200', function(done) {
      request.post('localhost:3000/api/guitar/')
      .send({ name: 'stratocaster', type: 'electric', make: 'fender'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        guitar = res.body;
        done();
      });
    });
    it('A POST request with no params should return 400', function(done) {
      request.post('localhost:3000/api/guitar/')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/guitar/', function() {
    it('An invalid id should return 404', function(done) {
      request.get('localhost:3000/api/guitar/123lookatme')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });
    //cant get a 400 error for some reason??? Could not for the life of me discover why this route was returning a 404! My route wasn't even stepping in to my app.get() function (./server.js:25). Seems like a weird issue.
    it('A proper route with no id should return 400', function(done) {
      request.get('localhost:3000/api/guitar/')
      .end((err, res) => {
        console.log('response status:', res.status);
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('A proper route with a valid id should return 200', function(done) {
      request.get(`localhost:3000/api/guitar/${guitar.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('stratocaster');
        expect(res.body.type).to.equal('electric');
        expect(res.body.make).to.equal('fender');
        done();
      });
    });
  });
});
