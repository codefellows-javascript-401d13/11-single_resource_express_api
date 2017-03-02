'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Cat = require('../model/cats.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleCat = {
  gender: 'example gender',
  color: 'example color'
};

describe('Cat Routes', function() {

  describe('GET: /api/cat', function() {
    describe('with a valid id', function() {
      before( done => {
        Cat.createItem(exampleCat)
        .then(cat => {
          this.tempCat = cat;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Cat.deleteItem(this.tempCat.id)
        .then( ()=> done())
        .catch( err => done(err));
      });

      it('should return a cat', done => {
        request.get(`${url}/api/cat/${this.tempCat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempCat.id);
          expect(res.body.gender).to.equal(this.tempCat.gender);
          expect(res.body.color).to.equal(this.tempCat.color);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/cat/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/cat', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempCat) {
          Cat.deleteItem(this.tempCat.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('should return a cat', done => {
        request.post(`${url}/api/cat`)
        .send(exampleCat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.gender).to.equal(exampleCat.gender);
          expect(res.body.color).to.equal(exampleCat.color);
          this.tempCat = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/cat', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Cat.createItem(exampleCat)
        .then( cat => {
          this.tempCat = cat;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempCat) {
          Cat.deleteItem(this.tempCat.id)
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return a cat', done => {
        let updatecat = { gender: 'new gender', color: 'new color' };
        request.put(`${url}/api/cat?id=${this.tempCat.id}`)
        .send(updatecat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempCat.id);
          for (var prop in updatecat) {
            expect(res.body[prop]).to.equal(updatecat[prop])
          }
          done();
        });
      });
    });
  });
});
