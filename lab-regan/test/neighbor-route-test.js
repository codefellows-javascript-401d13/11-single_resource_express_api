'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Neighbor Routes', function() {

  var neighbor = null;
  describe('POST: /api/neighbor', function() {
    it('should return a neighbor and 200', function(done) {
      request.post('localhost:8000/api/neighbor')
      .send({ name: 'test name', age: 'test age', friendly: 'yes' })
      .end((err, res) => {
        if (err) console.log('nope');
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.age).to.equal('test age');
        expect(res.body.friendly).to.equal('yes');
        neighbor = res.body;
        done();
      });
    });
  });

  describe('POST: 400 Bad Request', function() {
    it('should return a 400', function(done) {
      request.post('localhost:8000/api/neighbor')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/neighbor', function() {
    it('should return a neighbor', function(done) {
      request.get(`localhost:8000/api/neighbor/${neighbor.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.age).to.equal('test age');
        expect(res.body.friendly).to.equal('yes');
        done();
      });
    });
  });

  describe('GET: Not Found', function() {
    it('should return a 404', function(done) {
      request.get(`localhost:8000/api/neighbor/22edf8b0-fd79-11e6-a8de-zzbzz0e9316d`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET: Bad Request', function() {
    it('should return a 400', function(done) {
      request.get(`localhost:8000/api/neighbor`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
