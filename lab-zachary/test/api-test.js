'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe ('Bike route test', function (){
  var bike='';
  describe('POST route test', function(){
    it('should create a file and respond with a 200 status', function(done){
      request.post(':8000/api/bike')
      .send({'name':'test name', 'content':'test content'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.description).to.equal('test content');
        bike = res;
        done();
      });
    });
    it('should return a 400 error if invalid description content is included', function(done){
      request.post(':8000/api/bike')
      .send({'name': 'valid name'})
      .end((err, res) => {
        expect(err.message).to.equal('Bad Request');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Get route test', function(){
    it('should respond with body content for valid request', function(done){
      request.get(`:8000/api/bike/${bike.body.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.description).to.equal('test content');
        done();
      });
    });
    it('should respond with a 400 error if no id provided', function(done){
      request.get(':8000/api/bike')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(err.message).to.equal('Bad Request');
        done();
      });
    });
    it('should resond w/404 if bad id is passed', function(done){
      request.get(':8000/api/bike/imaFakeIdValue')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(err.message).to.equal('Not Found');
        done();
      });
    });
  });
  describe('Delete test', function(){
    it('should respond with a 204 if successfully deleted', function(done){
      request.delete(`:8000/api/bike/${bike.body.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});
