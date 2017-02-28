'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('cat:server');

const Cat = require('./model/cat');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'test route worked' });
});

app.post('/api/cat', jsonParser, function(req, res, next) {
  debug('POST: /api/cat');

  Cat.createCat(req.body)
  .then( cat => res.json(cat))
  .catch( err => next(err));
});

app.get('/api/cat', function(req, res, next) {
  debug('GET: api/cat');
  Cat.fetchCat(req.query.id)
  .then( cat => res.json(cat))
  .catch( err => next(err));
});

app.delete('/api/cat', function(req, res, next) {
  debug('DELETE: api/cat');
  Cat.deleteCat(req.query.id)
  .then( cat => res.json(cat))
  .catch( err => next(err));
})
app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);
  console.log(req.body.name);
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
