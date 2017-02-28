'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('bike:server');
const jsonParser = require('body-parser').json();

const Bike = require('./model/bike.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', (req, res) => {
  debug('GET: test route');

  res.send('Um yes hello this is the test route');
});

app.get('/api/bike', (req, res, next) =>{
  debug('GET: /api/bike');
  //retrieve file info from storage
  Bike.fetchEntry()
  .then( data => res.send(data))
  .catch( err => next(err));
});
app.get('/api/bike/:bikeId', (req, res, next) =>{
  debug('GET: /api/bike/:bikeId');
  //retrieve file info from storage
  Bike.fetchEntry(req.params.bikeId)
  .then( data => res.send(data))
  .catch( err => next(err));
});


app.post('/api/bike', jsonParser, (req, res, next) => {
  debug('POST: api/bike');

  Bike.createEntry(req.body)
  .then ( bike => { //get resolved Promise and write as JSON
    res.json(bike); //.json() is body-parser method for writing response, with proper headers
  })
  .catch (err => next(err)); //catch error and pass with next() to error handler at bottom of file
});

app.delete('/api/bike/:bikeId', (req, res, next) => {
  debug('DELETE: api/bike');

  Bike.deleteEntry(req.params.bikeId)
  .then( bike => {
    debug('Delete param:', bike);
    res.status(204).json(bike);
  })
  .catch( err => next(err));
});
app.use(function (err,req, res, next){
  debug('error middleware');
  console.error(err.message);

  if(err.status){
    res.sendStatus(err.status).send(err.name);
    return;
  }
  err.createError(500, err.status);
  next(err);
});


app.listen(PORT, () => {
  debug('server up:', PORT);
});