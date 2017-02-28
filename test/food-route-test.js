'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Food Routes', function() {
  var food = null;

  describe('POST: /api/food', function() {
    it('should return a meal', function(done) {
      request.post('localhost:8000/api/food')
      .send({name:'test name', meal:'test meal'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.meal).to.equal('test meal');
        food = res.body;
        done();
      });
    });
    it('should not return a meal', function(done) {
      request.post('localhost:8000/api/food')
      .send({name:'test name'})
      .end( (res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/food', function() {
    it('should return a meal', function(done) {
      request.get(`localhost:8000/api/food/${food.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.meal).to.equal('test meal');
        done();
      });
    });

    it('should return bad request', function(done) {
      request.get(`localhost:8000/api/fud`)
      .end( (res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });


    it('should return a meal', function(done) {
      request.get(`localhost:8000/api/food?i`)
      .end( (res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  // describe('DELETE: /api/food', function() {
  //   it('should delete the file with the coresponding id', function(done) {
  //     request.delete(`localhost:8000/api/food/${food.id}`)
  //     .end( (err, res) => {
  //       expect(res.status).to.equal(204);
  //       done();
  //     });
  //   });
  // });
});
