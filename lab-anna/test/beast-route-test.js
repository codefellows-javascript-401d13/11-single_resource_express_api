'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Beast = require('../model/beast.js');
const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/beasttest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleBeast = {
  kind: 'test beast kind',
  timestamp: 'test beast timestamp'
};

describe('Beast Routes', function() {
  describe('POST: /api/beast', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempBeast) {
          Beast.remove({})
          .then(() => done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return a beast', done => {
        request.post(`${url}/api/beast`)
        .send(exampleBeast)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal('test beast kind');
          this.tempBeast = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/beast/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleBeast.timestamp = new Date();
        new Beast(exampleBeast).save()
        .then( beast => {
          this.tempBeast = beast;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleBeast.timestamp;
        if (this.tempBeast) {
          Beast.remove({})
          .then(() => done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return a beast', done => {
        request.get(`${url}/api/beast/${this.tempBeast._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test beast name');
          done();
        });
      });
    });
  });

  describe('PUT: /api/beast', function() {
    describe('with a valid id and body', function() {
      before( done => {
        new Beast(exampleBeast).save()
        .then( beast => {
          this.tempBeast = beast;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempBeast) {
          Beast.remove({})
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return a beast', done => {
        let updateBeast = { kind: 'new kind', timestamp: 'new timestamp' };
        request.put(`${url}/api/beast/:id=${this.tempBeast._id}`)
        .send(updateBeast)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempBeast._id);
          for (var prop in updateBeast) {
            expect(res.body[prop]).to.equal(updateBeast[prop])
          }
          done();
        });
      });
    });
  });
});
