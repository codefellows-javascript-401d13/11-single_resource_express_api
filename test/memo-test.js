'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('My Memo Routes', function(){
  var memo = 'null';

  describe('test for POST: /api/memo', function() {
    it('it should return memo', function(done){
      request.post('localhost:8000/api/memo')
     .send({ title: 'test title', entry: 'test entry' })
     .end((err, res) => {
       expect(res.status).to.equal(200);
       expect(res.body.title).to.equal('test title');
       expect(res.body.entry).to.equal('test entry');
       memo = res.body;
       done();
     });
    });
  });

  describe('POST: api/memo', function() {
    it('it should return a 400 error', function(done){
      request.post('localhost:8000/api/memo')
     .send()
     .end((err, res) => {
       expect(res.status).to.equal(400);
       expect(res.text).to.equal('BadRequestError');
       done();
     });
    });
  });


  describe('GET: /api/memo', function(){
    it('should return memo', function(done){
      request.get(`localhost:8000/api/memo/${memo.id}`)
     .end((err, res) => {
       expect(res.status).to.equal(200);
       expect(res.body.id).to.equal(memo.id);
       expect(res.body.title).to.equal('test title');
       expect(res.body.entry).to.equal('test entry');  
       done(); 
     });
    });
  });

  describe('GET: /api/memo', function() {
    it('should return a 400 error if no id was provided', function(done){
      request.get('localhost:8000/api/memo')
     .end((err, res) => {
       expect(res.status).to.equal(400);
       expect(res.body.id).to.equal(undefined);
       done();
     });
    });
  });

  describe('GET: /api/memo', function(){
    it('should return a 404 not found', function(done){
      request.get('localhost:8000/api/memo/123')
     .end((err, res) => {
       expect(res.status).to.equal(404);
       expect(res.text).to.equal('NotFoundError');
       done(); 
     }); 
    });
  });
});
