'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('sneaker:server');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Sneaker = require('./model/sneaker.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.post('/api/sneaker', jsonParser, function(req, res, next) {
  debug('POST: /api/sneaker');

  Sneaker.createSneaker(req.body)
  .then( sneaker => res.json(sneaker))
  .catch( err => next(err));
});

app.get('/api/sneaker/:id?', function(req, res, next) {
  debug('GET: /api/sneaker');

  Sneaker.fetchSneaker(req.params.id)
  .then( sneaker => res.json(sneaker))
  .catch( err => next(err));
});

app.delete('/api/sneaker/:id', function(req, res, next) {
  debug('DELETE: /api/sneaker');

  Sneaker.deleteSneaker(req.params.id)
  .then( () => res.sendStatus(204))
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => debug(`Servin' it up on: ${PORT}`));
