'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Beast = require('../model/beast.js');
// const Cat = require('../model/cat.js');

const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/beasttest';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleBeast = {
  kind: 'test beast kind',
  timestamp: new Date()
};

const exampleCat = {
  gender: 'test cat gender',
  color: 'test cat color'
};

describe('Beast Routes', function() {
  describe('POST: /api/beast', function() {
    describe('', function() {
      afterEach( done => {
        if (this.tempBeast) {
          Beast.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a beast', done => {
        request.post(`${url}/api/beast`)
        .send(exampleBeast)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.kind).to.equal('test beast kind');
          this.tempBeast = res.body;
          done();
        });
      });

      it('should return 404 status, not found', done => {
        request.post(`${url}/api/`)
        .send(exampleBeast)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return 400 status, bad request', done => {
        request.post(`${url}/api/beast`)
        .send('bad beast')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/beast/:id', function() {
    describe('', function() {
      beforeEach( done => {
        exampleBeast.timestamp = new Date();
        new Beast(exampleBeast).save()
        .then( beast => {
          this.tempBeast = beast;
          return Beast.findByIdAndAddCat(beast._id, exampleCat);
        })
        .then( cat => {
          this.tempCat = cat;
          done();
        })
        .catch(done);
      });

      afterEach( done => {
        if (this.tempBeast) {
          Beast.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a beast', done => {
        request.get(`${url}/api/beast/${this.tempBeast._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.kind).to.equal('test beast kind');
          expect(res.body.cats.length).to.equal(1);
          expect(res.body.cats[0].gender).to.equal(exampleCat.gender);
          done();
        });
      });

      it('should return 404 status, not found', done => {
        request.get(`${url}/api/beast`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/beast/:id', function() {
    describe('', function() {
      beforeEach( done => {
        // exampleBeast.timestamp = new Date();
        new Beast(exampleBeast).save()
        .then( beast => {
          this.tempBeast = beast;
          done();
        })
        .catch(done);
      });

      afterEach( done => {
        if (this.tempBeast) {
          Beast.remove({})
          .then( ()=> done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a beast', done => {
        let updateBeast = { kind: 'new kind'};
        request.put(`${url}/api/beast/${this.tempBeast._id}`)
        .send(updateBeast)
        .end((err, res) => {
          if (err) return done(err);
          let timestamp = new Date(res.body.timestamp);
          expect(res.status).to.equal(200);
          expect(res.body.kind).to.equal(updateBeast.kind);
          expect(timestamp.toString()).to.equal(exampleBeast.timestamp.toString());
          done();
        });
      });

      it('should return 404 status, not found', done => {
        request.put(`${url}/api/beast`)
        .send('bad request')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

    });
  });
});
