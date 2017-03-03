'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Cat = require('../model/cat.js');
const PORT =process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/cattest';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleCat = {
  gender: 'example gender',
  color: 'example color'
};

describe('Cat Routes', function() {
  describe('GET: /api/cat/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Cat(exampleCat).save()
        .then(cat => {
          this.tempCat = cat;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempCat) {
          Cat.remove({})
          .then( ()=> done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return a cat', done => {
        request.get(`${url}/api/cat/${this.tempCat._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.gender).to.equal('example gender');
          expect(res.body.color).to.equal('example color');
          done();
        });
      });

      it('should return 404 status if no id', done => {
        request.get(`${url}/api/cat`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

    });
  });

  describe('POST: /api/cat', function() {
    describe('post request', function() {
      before( done => {
        new Cat(exampleCat).save()
        .then(cat => {
          this.tempCat = cat;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempCat) {
          Cat.remove({})
          .then( ()=> done())
          .catch(done);
        };
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

      it('no body - status 400, bad request', done => {
        request.post(`${url}/api/cat`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });

    });
  });

  describe('PUT: /api/cat/:id', function() {
    describe('put request', function() {
      before( done => {
        new Cat(exampleCat).save()
        .then( cat => {
          this.tempCat = cat;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempCat) {
          Cat.remove({})
          .then( ()=> done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return a cat', done => {
        let updateCat = { gender: 'new gender', color: 'new color' };
        request.put(`${url}/api/cat/${this.tempCat._id}`)
        .send(updateCat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.gender).to.equal(updateCat.gender);
          expect(res.body.color).to.equal(updateCat.color);
          done();
        });
      });

      it('no body - status 400, bad request', done => {
        request.post(`${url}/api/cat`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });

      it('no id - status 404, not found', done => {
        request.put(`${url}/api/cat`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
