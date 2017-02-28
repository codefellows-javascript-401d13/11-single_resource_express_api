'use strict';

const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const jsonParser = require('body-parser').json();
const debug = require('debug')('food:server');

const Food = require('./model/food.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'test route worked'});
});

app.post('/api/food', jsonParser, function(req, res, next) {
  debug('POST: /api/food');

  Food.createFood(req.body)
  .then( food => res.json(food))
  .catch( err => next(err));
});

app.get('/api/food/:id', function(req, res, next) {
  debug('GET: /api/food');

  Food.fetchFood(req.params.id)
  .then( food => res.json(food))
  .catch( err => next(err));
});

app.delete('/api/food/:id', function(req, res, next) {
  debug('DELETE: /api/food');

  Food.deleteFood(req.query.id)
  .then( () => res.status(204).end())
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
