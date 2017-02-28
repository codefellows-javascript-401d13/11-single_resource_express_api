'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Oohdata Routes', function() {
  var oohdata = null;

  describe('POST: /api/oohdata', function() {
    it('should return an oohdata', function(done) {
      request.post('localhost:3000/api/oohdata')
      .send({ name: 'test name', content: 'test content', animal: 'test animal' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.animal).to.equal('test animal');
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        oohdata = res.body;
        done();
      });
    });
  });

  describe('POST: /api/oohdata', function() {
    it('should return a 400 error', function(done) {
      request.post('localhost:3000/api/oohdata')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        done();
      })
    })
  })

  describe('GET: /api/oohdata', function() {
    it('should return a oohdata', function(done) {
      request.get(`localhost:3000/api/oohdata/${oohdata.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.animal).to.equal('test animal');
        expect(res.body.content).to.equal('test content')
        expect(res.body.name).to.equal('test name');
        done();
      });
    });
  });

  describe('GET: /api/oohdata', function() {
    it('should return a 400 error', function(done) {
      request.get('localhost:3000/api/oohdata')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(err).to.equal.null;
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });
  });

  describe('GET: /api/oohdata', function() {
    it('should return a 404 not found', function(done) {
      request.get('localhost:3000/api/oohdata/7272727')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(err).to.equal.null;
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });
  });

  describe('DELETE: /api/oohdata', function() {
    it('should return a 204 if given a correct id and route', function(done) {
      request.delete(`localhost:3000/api/oohdata/${oohdata.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  describe('DELETE: /api/oohdata', function() {
    it('should return a 404 if given a bad id', function(done) {
      request.delete('localhost:3000/api/oohdata/72727272')
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
