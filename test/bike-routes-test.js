'use strict';

const request = require('superagent');
const expect = require('chai').expect;
// const chaiHTTP = require('chai-http');

require(`${__dirname}/../server.js`);

describe('Bike Routes Module', function() {
  let testBike = [];
  describe('POST: 3000/api/bike', function() {
    it('should post a bike to a new file', function(done) {
      request.post('localhost:3000/api/bike')
      .send({ brand: 'Rodriguez', type: 'Cyclocross'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.brand).to.equal('Rodriguez');
        expect(res.body.type).to.equal('Cyclocross');
        testBike = res.body;
        done();
      });
    });
    it('should throw 400 error for empty post', function(done) {
      request.post('localhost:3000/api/bike')
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(err.status);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });
    it('should throw 400 error wich invalid keys', function(done) {
      request.post('localhost:3000/api/bike')
      .send({ snow: 'man', ski: 'boot'})
      .end((err, res) => {
        expect(res.status).to.equal(err.status);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });
  });
  describe('GET :3000/api/bike', function() {
    // let testId = 'f8dbc3c0-fd4d-11e6-be04-3b78bdf018ba';
    it('should retun bike object and 200 status', function(done) {
      request.get(`localhost:3000/api/bike/${testBike.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.brand).to.equal(testBike.brand);
        expect(res.body.type).to.equal(testBike.type);
        done();
      });
    });
    it('should return 404 not found', function(done) {
      request.get('localhost:3000/api/bike/123456')
      .end((err, res) => {
        expect(res.status).to.equal(err.status);
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return 400 bad request error', function(done) {
      request.get('localhost:3000/api/bike')
      .end((err, res) => {
        expect(res.status).to.equal(err.status);
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('DELETE :3000/api/bike', function() {
    it('should return a 204 message with no content', function(done) {
      request.delete(`localhost:3000/api/bike/${testBike.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.empty;
        done();
        // expect(res)
      });
    });
  });
  describe('PUT :3000/api/bike', function() {
    it('should return a 404 error', function(done) {
      request.put('localhost:3000/api/bike')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
