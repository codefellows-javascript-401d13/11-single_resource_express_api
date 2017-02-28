'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Tea routes', function() {
    var tea = null;

    describe('POST: /api/tea', function() {
        it('should return a test item', function(done) {
            request.post('localhost:8000/api/tea')
            .send({ type: 'test type', flavor: 'test flavor'})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.type).to.equal('test type');
                expect(res.body.flavor).to.equal('test flavor');
                tea = res.body;
                done();
            });
        });
        it('should not return tea', function(done) {
            request.post('localhost:8000/api/tea')
            .send({type:'test type'})
            .end( (res) => {
                expect(res.status).to.equal(400);
                done();
            })
        })
    })
})