'use strict';

const request = require('superagent'); //allows us to test server stuff, yay!
const expect = require('chai').expect;
const exec = require('child_process').exec;

var list = []; //array to store list of test IDs
var cmd = 'rm data/blog/*';

before(function(done) {
  exec(cmd, function(err) { //this is to empty the data/blog directory of all files so the list tests can run
    if (err) done (err);
    done();
  });
});

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
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot GET /api/alsoWrongRoute\n');
        done();
      });
    });
    it('DELETE should return 404 not found', function(done) {
      request.delete('localhost:3003/api/wrongestRouteYet')
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
    it('should update an existing blog entry', function(done) {
      request.post('localhost:3003/api/blog')
      .send({ id: blog.id, name: 'updated test name', content: 'updated test content' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(blog.id);
        expect(res.body.name).to.equal('updated test name');
        expect(res.body.content).to.equal('updated test content');
        done();
      });
    });
  });
  describe('GET: /api/blog', function() {
    it('should return a blog entry', function(done) {
      request.get(`localhost:3003/api/blog/${blog.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('updated test name');
        expect(res.body.content).to.equal('updated test content');
        blog = res.body;
        done();
      });
    });
    it('should return a 404 not found', function(done) {
      request.get('localhost:3003/api/blog/wrongID')
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('GET (list): /api/blog', function() {
    before(function(done) {
      list.push(`${blog.id}.json`); //put the thing we stored from the initial POST above
      request.post('localhost:3003/api/blog')
      .send( { name: 'test name 1', content: 'test content 1' } )
      .end((err, res) => {
        if (err) return done(err);
        list.push(res.body.id + '.json'); //I tried doing these with template literals and it pushed nothing into the array (???)
      });
      request.post('localhost:3003/api/blog')
      .send( { name: 'test name 2', content: 'test content 2' } )
      .end((err, res) => {
        if (err) return done(err);
        list.push(res.body.id + '.json');
      });
      request.post('localhost:3003/api/blog')
      .send( { name: 'test name 3', content: 'test content 3' } )
      .end((err, res) => {
        if (err) return done(err);
        list.push(res.body.id + '.json');
      });
      done();
    });
    it('should return a list of stored blog entry filenames', function(done) {
      request.get('localhost:3003/api/blog')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(JSON.stringify(list));
        done();
      });
    });
  });
  describe('DELETE: /api/blog', function() {
    it('should delete a blog entry', function(done) {
      request.delete(`localhost:3003/api/blog/${blog.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.be.empty;
        done();
      });
    });
    it('should fail to GET deleted entry', function(done) {
      request.get(`localhost:3003/api/blog/${blog.id}`)
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
