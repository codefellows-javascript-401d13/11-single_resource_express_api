'use strict';

const express = require('express');
const debug = require('debug')('guitar:server');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Guitar = require('./model/guitar.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/guitar/', jsonParser, function(req, res, next) {
  debug('POST: api/guitar/');

  Guitar.createGuitar(req.body)
  .then(guitar => res.json(guitar))
  .catch(err => next(err));

});

app.get('/api/guitar/:id', function(req, res, next) {
  debug('GET: api/guitar');

  Guitar.fetchGuitar(req.params.id)
  .then( guitar => res.json(guitar))
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
  debug(`port is up yo ${PORT}`);
});
