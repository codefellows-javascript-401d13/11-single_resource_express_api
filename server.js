'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('oohdata:server');

const Oohdata = require('./model/oohdata.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({msg: 'test route worked'});
});

app.post('/api/oohdata', jsonParser, function(req, res, next) {
  debug('POST: /api/oohdata');

  Oohdata.createOohdata(req.body)
  .then( oohdata => res.json(oohdata))
  .catch( err => next(err));
});

app.get('/api/oohdata/', function(req, res, next) {
  debug('GET: /api/oohdata with no params');

  Oohdata.fetchOohdata(req.params.id)
  .then( oohdata => res.json(oohdata))
  .catch( err => next(err));
});

app.get('/api/oohdata/:id', function(req, res, next) {
  debug('GET: /api/oohdata with params');

  Oohdata.fetchOohdata(req.params.id)
  .then( oohdata => res.json(oohdata))
  .catch( err => next(err));
});

app.delete('/api/oohdata/:id', function(req, res, next) {
  debug('DELETE: /api/oohdata');

  Oohdata.deleteItem('oohdata', req.params.id)
  .catch( err => next(err));
  next();
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
  debug(`server up on: ${PORT}`);
})
