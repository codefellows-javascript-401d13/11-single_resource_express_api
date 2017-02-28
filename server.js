'use strict';

const express = require('express');
const debug = require('debug')('bike:server');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const PORT = process.env.PORT || 3000;
const app = express();

const Bike = require('./model/bike.js');

app.use(morgan('dev'));

app.post('/api/bike', jsonParser, function(req, res, next) {
  debug('POST: /api/bike');

  Bike.createBike(req.body)
  .then( bike => res.json(bike))
  .catch( err => next(err));
});

app.get('/api/bike/:id', function(req, res, next) {
  debug('GET: /api/bike');

  Bike.fetchBike(req.params.id)
  .then( bike => res.json(bike))
  .catch( err => next(err));
});

app.delete('/api/bike/:id', function(req, res, next) {
  debug('DELETE: /api/bike');

  Bike.deleteBike(req.params.id)
  .then(res.status(204).send())
  .catch( err => next(err));
});

app.put('*', function(req, res, next) {
  debug('* for undefined put routes');

  next(new createError(404, 'Not Found'));
});

app.get('/api/bike/', function(req, res, next) {
  debug('get req without id');

  next(new createError(400, 'Bad Request'));
});

app.use(function(err, req, res, next) {
  debug('error handler middleware');

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});

app.listen(PORT, function() {
  debug(`Server's up on port: ${PORT}`);
});
