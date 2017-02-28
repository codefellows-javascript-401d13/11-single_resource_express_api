'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');
const PORT = process.env.PORT || 3000;

describe('Sneaker Routes', function() {
  let sneaker = null;

  describe('GET: unregistered route', function() {
    it('should return a 404 status code', function(done){
      request.get(`localhost:${PORT}/api/notaroute`)
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST: /api/sneaker', function() {
    it('should return 200 and a sneaker with valid id', function(done) {
      request.post(`localhost:${PORT}/api/sneaker`)
      .send( { model: 'Air Test 90', brand: 'Testo'} )
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.model).to.equal('Air Test 90');
        expect(res.body.brand).to.equal('Testo');
        sneaker = res.body;
        done();
      });
    });

    it('should return 400 with a bad sneaker body', function(done) {
      request.post(`localhost:${PORT}/api/sneaker`)
      .send( { badBody: 'not a valid sneaker object'} )
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/sneaker', function() {
    it('should return 200 and a sneaker with a valid id', function(done) {
      request.get(`localhost:${PORT}/api/sneaker/${sneaker.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.model).to.equal('Air Test 90');
        expect(res.body.brand).to.equal('Testo');
        done();
      });
    });

    it('should return a 404 with id not found ', function(done) {
      request.get(`localhost:${PORT}/api/sneaker/badID`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(err).to.be.an('error');
        done();
      });
    });

    it('should return a 400 when an id is not provided ', function(done) {
      request.get(`localhost:${PORT}/api/sneaker`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(err).to.be.an('error');
        done();
      });
    });
  });

  describe('DELETE: /api/sneaker/id', function() {
    it('should return 204 if provided a valid id', function(done) {
      request.delete(`localhost:${PORT}/api/sneaker/${sneaker.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });

    it('should return 404 if provided a invalid id', function(done) {
      request.delete(`localhost:${PORT}/api/sneaker?id=badID`)
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
