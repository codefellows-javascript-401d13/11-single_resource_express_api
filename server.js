'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('rwby:server');

const Rwby = require('./model/rwby.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res){
  debug('Get: /test');
  res.json({msg: 'test route worked'});
});

app.post('/api/rwby', jsonParser, (req, res, next) => {
  debug('POST: /api/rwby');
  Rwby.createRwby(req.body)
  .then( rwby => res.json(rwby))
  .catch( err => next(err));
});

app.get('/api/rwby/:id', function(req, res, next){
  debug('Get: /api/rwby/:id');
  console.log(' in get in server', req.params.id);
  Rwby.fetchRwby(req.params.id)
  .then(rwby => res.json(rwby))
  .catch(err => next(err));
});

app.delete('/api/delete/:schemaName/:id', function(req, res, next){
  debug('Delete: /api/delete/:schemaName/:id');
  Rwby.deleteRwby(req.params.schemaName, req.params.id)
  .then( () =>console.log(`Rwby of id ${req.params.id}, has been deleted`))
  .catch( err => next(err));
});

app.use(function(err, req, res, next){ //eslint-disable-line
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
