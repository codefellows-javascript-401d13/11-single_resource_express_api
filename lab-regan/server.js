'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('neighbor:server');
const jsonParser = require('body-parser').json();

const PORT = process.env.PORT || 3000;
const app = express();

const Neighbor = require('./model/neighbor.js');

app.use(morgan('dev'));

//woo it works!
app.get('/test', function(req,res){
  debug('GET: /test');
  res.json({msg: 'test route worked oh yee'});
});//end get test

app.get('/api/neighbor/:id', function(req,res, next)
{
  debug('GET: /api/neighbor/:id');
  Neighbor.fetchNeighbor(req.params.id)
.then( thing => res.json(thing))
.catch( err => next(err));
});//end app.get /api/neighbor

app.post('/api/neighbor', jsonParser, function(req, res, next){
  debug('POST: /api/neighbor');
  Neighbor.createNeighbor(req.body)
  .then( thing => res.json(thing))
  .catch( err => next(err));
});//end app.post /api/neighbor


app.use(function(err, req, res, next){
  debug('error middleware');
  console.error('you caused an error:', err.message);

  if(err.status){
    res.status(err.status).send(err.name);
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});//end app.use error handling

app.listen(PORT, () => {
  debug(`Server is up on port: ${PORT}`);
});
