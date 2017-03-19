'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Beast = require('../model/beast.js');
const Cat = require('../model/cat.js');

const PORT =process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/cattest';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleCat = {
  gender: 'example gender',
  color: 'example color'
};

const exampleBeast = {
  kind: 'example beast',
  timestamp: new Date()
};

describe('Cat Routes', function() {
  describe('POST: /api/beast/:beastID/cat', function() {
    describe('with a valid beast id and cat body', () => {
      before( done => {
        new Beast(exampleBeast).save()
        .then( beast => {
          this.tempBeast = beast;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          Beast.remove({}),
          Cat.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a cat', done => {
        request.post(`${url}/api/beast/${this.tempBeast.id}/cat`)
        .send(exampleCat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.gender).to.equal(exampleCat.gender);
          expect(res.body.beastID).to.equal(this.tempBeast._id.toString());
          done();
        });
      });

      it('should return 404 status code, not found', done => {
        request.post(`${url}/api/beast/cat`)
        .send(exampleCat)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return 400 status code, bad request', done => {
        request.post(`${url}/api/beast/${this.tempBeast.id}/cat`)
        .send('bad cat')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });

    });
  });
});
