'use strict';

const expect = require('chai').expect;
const request = require('superagent');
require('../server.js');

describe('Employee routes', function(){
  var employee = null;
  describe('GET /api/fakeroute', function(){
    it('should return a 404', function(done){
      request.get('localhost:8000/api/fakeroute/374734736473')
      .end((err, res) => {
        expect(!!err).to.equal(true);
        expect(res.status).to.equal(404);
        done();
      })
    });
  });
  describe('GET /api/employee', function(){
    it('should return a 404', function(done){
      request.get('localhost:8000/api/employee/7293928374928374')
      .end((err, res) => {
        expect(!!err).to.equal(true);
        expect(res.status).to.equal(404);
        done();
      })
    })
    it('should return a 400', function(done){
      request.get('localhost:8000/api/employee').
      end((err, res) => {
        expect(!!err).to.equal(true);
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
  describe('POST /api/employee', function(){
    it('should return 400', function(done){
      request.post('localhost:8000/api/employee')
      .end((err, res) => {
        expect(!!err).to.equal(true);
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
  describe('POST /api/employee', function(){
    it('should create an employee', function(done){
      request.post('localhost:8000/api/employee')
      .send({name: 'khalid', title:'Dev'})
      .end((err, res) => {
        if(err) return (err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('khalid');
        expect(res.body.title).to.equal('Dev');
        employee = res.body;
        console.log(employee.name);
        done();
      })
    })
  })
  describe('GET /api/employee', function(){
    it('should get an employee', function(done){
      request.get(`localhost:8000/api/employee/${employee.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('khalid');
        expect(res.body.title).to.equal('Dev');
        done();
      })
    })
  })
})
