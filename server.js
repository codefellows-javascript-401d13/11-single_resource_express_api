'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('journal:server');

const Journal = require('./model/journal');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res){
  debug('GET: /test');
  res.json({ msg: 'test route worked' });
});

app.post('/api/journal', jsonParser, function(req, res, next) {
  debug('POST: /api/journal');

  Journal.createJournal(req.body)
  .then( journal => res.json(journal))
  .catch( err => next(err));
});

app.get('/api/journal/:id', function(req, res, next) {
  debug('GET: /api/journal');

  Journal.fetchJournal(req.params.id)
  .then( journal => res.json(journal))
  .catch( err => next(err));
});

app.get('/api/journal/', function(req, res, next) {
  debug('GET: /api/journal with no params');

  Journal.fetchJournal(req.params.id)
  .then( journal => res.json(journal))
  .catch( err => next(err));
});

app.delete('/api/portfolio', function(req, res, next){
  debug('DELETE: /api/journal');

  Journal.deleteJournal('journal', req.query.id)
  .then( () => debug('portfolio', req.query.id))
  .catch( err => next(err));
  next();
});

app.use(function(err, req, res, next){
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
  debug(`server is upppp: ${PORT}`);
});
