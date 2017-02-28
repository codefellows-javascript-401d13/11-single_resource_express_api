'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('tea:server');

const Tea = require('./model/tea');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
    debug('GET: /test');
    res.json({ msg: 'test route worked!'});
});

app.post('/api/tea', jsonParser, function(req, res, next) {
    debug('POST: /api/tea');

    Tea.createTea(req.body)
    .then( tea => res.json(tea))
    .catch( err => next(err));
});

app.get('/api/tea', function(req, res, next) {
    debug('GET: /api/tea');

    Tea.fetchTea(req.query.id)
    .then( tea => res.json(tea))
    .catch( err => next(err));
});

app.delete('/api/tea/:id', function(req, res, next) {
    debug('DELETE: /api/tea');

    Tea.deleteTea(req.query.id)
    .then( () => res.status(204).end())
    .catch( err => next(err));
});

app.use(function(err, req, res, next) {
    debug('error middleware');
    console.error(err.message);

    if (err.status) {
        res.status(err.status).send(err.name);
        return;
    }

    err = createError(500, err.message);
    res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
    debug(`server up: ${PORT}`);
});