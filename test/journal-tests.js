'use strict';

const request = require('superagent');
const expect = require('chai').expect;
// const Journal = require('../model.journal.js');
// const URL = 'http://localhost:3000';

require('../server.js');


describe('My Journal Routes', function(){
  var journal = null;

  describe('POST: /api/journal', function() {
    it('it should return journal', function(done){
      request.post('localhost:3000/api/journal')
      .send({ author: 'test author', entries: 'test entries' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.author).to.equal('test author');
        expect(res.body.entries).to.equal('test entries');
        journal = res.body;
        done();
      });
    });
  });

  describe('POST: api/journal', function() {
    it('it should return a 400 error', function(done){
      request.post('localhost:3000/api/journal')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        done();
      });
    });
  });


  describe('GET: /api/journal', function(){
    it('should return journal', function(done){
      request.get(`localhost:3000/api/journal/${journal.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.author).to.equal('test author');
        expect(res.body.entries).to.equal('test entries');
        done();
      });
    });
  });

  describe('GET: /api/journal', function() {
    it('should return a 400 error if no id was provided', function(done){
      request.get('localhost:3000/api/journal')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/journal', function(){
    it('should return a 404 not found', function(done){
      request.get('localhost:3000/api/journal/123')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });
  });

  //http :3000/api/journal/4f1ad740-fd57-11e6-b209-4161c6c95e8f

  describe('DELETE: /api/journal', function(){
    it('should remove the id', function(done) {
      request.delete(`localhost:3000/api/journal/:${journal.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.be.empty
        done();
      });
    });
  });
});
