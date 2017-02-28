'use strict';

const request = require('superagent'); //allows us to test server stuff, yay!
const expect = require('chai').expect;

require('../server.js');

describe('Blog Routes', function() {
  var blog = null;
  describe('any request with unregistered route', function() {
    it('POST should return 404 not found', function(done) {
      request.post('localhost:3003/api/wrongRoute')
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot POST /api/wrongRoute\n');
        done();
      });
    });
    it('GET should return 404 not found', function(done) {
      request.get('localhost:3003/api/alsoWrongRoute')
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot GET /api/alsoWrongRoute\n');
        done();
      });
    });
    it('DELETE should return 404 not found', function(done) {
      request.delete('localhost:3003/api/wrongestRouteYet')
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot DELETE /api/wrongestRouteYet\n');
        done();
      });
    });
  });
  describe('POST: /api/blog', function() {
    it('should return a blog entry', function(done) {
      request.post('localhost:3003/api/blog')
      .send( { name: 'test name', content: 'test content' } ) //POST request for an object with those properties
      .end((err, res) => {
        if (err) return done(err); //test fails, exit and dont' execute expects below
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        blog = res.body;
        done();
      });
    });
    it('should return a 400 bad request', function(done) {
      request.post('localhost:3003/api/blog')
      .send({ name: 'test name' })
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('GET: /api/blog', function() {
    it('should return a blog entry', function(done) {
      request.get(`localhost:3003/api/blog/${blog.id}`)
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        blog = res.body;
        done();
      });
    });
    it('should return a 404 not found', function(done) {
      request.get('localhost:3003/api/blog/wrongID')
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
    // it('should return a list of stored blog entry filenames', function(done) {
    //   var list = []; //array to store list of test IDs
    //   list.push(`${blog.id}.json`); //put the thing we stored from the initial POST above
    //   request.post('localhost:3003/api/blog')
    //   .send( { name: 'test name', content: 'test content' } )
    //   .end((err, res) => {
    //     if (err) return done(err);
    //     list.push(res.body.id);
    //   });
    //   request.post('localhost:3003/api/blog')
    //   .send( { name: 'test name', content: 'test content' } )
    //   .end((err, res) => {
    //     if (err) return done(err);
    //     list.push(res.body.id);
    //   });
    //   request.post('localhost:3003/api/blog')
    //   .send( { name: 'test name', content: 'test content' } )
    //   .end((err, res) => {
    //     if (err) return done(err);
    //     list.push(res.body.id);
    //   });
    //   console.log('array', list);
    //   request.get('localhost:3003/api/blog')
    //   .send( { name: 'test name', content: 'test conteent' } )
    //   .end((err, res) => {
    //     if (err) return done(err);
    //     expect(res.status).to.equal(200);
    //     expect(res.text).to.equal(JSON.stringify(list));
    //     done();
    //   });
    // });
  });
  describe('DELETE: /api/blog', function() {
    it('should delete a blog entry', function(done) {
      request.delete(`localhost:3003/api/blog/${blog.id}`)
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.be.empty;
        done();
      });
    });
    it('should fail to GET deleted entry', function(done) {
      request.get(`localhost:3003/api/blog/${blog.id}`)
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
