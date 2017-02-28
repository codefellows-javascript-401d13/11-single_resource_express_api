'use strict';

const express = require('express');
const debug = require('debug')('memo:server');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Memo = require('./model/memo.js');

const PORT = process.env.port || 8000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res){
  debug('GET: /test');
 
  res.send({ msg: 'test route worked'});
});


//post or put method always needs 'jsonParser'
app.post('/api/memo', jsonParser, function(req, res, next) {
  debug('POST: /api/memo');

  Memo.createMemo(req.body)
    .then( memo => res.json(memo))
    .catch( err => next(err));
});

app.get('/api/memo/:id', function(req, res, next) {
  debug('GET: /api/memo');

  Memo.fetchMemo(req.params.id)
    .then( memo => res.json(memo))
    .catch( err => next(err));
});

app.get('/api/memo/', function(req, res, next){
  debug('GET: /api/memo');

  Memo.fetchMemo(req.params.id)
    .then( memo => res.json(memo))
    .catch( err => next(err));
});

app.delete('/api/memo/:id', function(req, res, next){
  debug('DELETE: /api/memo');

  Memo.deleteMemo(req.params.id)
     .then( () => {
       res.sendStatus(204);
       res.json();
     })
     .catch( err => next(err)); 
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if(err.status){
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

// app.use(errors);

app.listen(PORT, () => {
  debug(`Magic Land is izzup: ${PORT}`);
});