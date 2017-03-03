'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Beast = require('../model/beast.js');
const beastRouter = module.exports = new Router();
const debug = require('debug')('beast:beast-route')

beastRouter.post('/api/beast', jsonParser, function(req, res, next) {
  debug('post: /api/beast');
  req.body.timestamp = new Date();
  new Beast(req.body).save()
  .then(beast => res.json(beast))
  .catch(next); //sends to error middleware
});

beastRouter.get('/api/beast/:id', function(req, res, next) {
  debug('get: /api/beast/:id');
  Beast.findById(req.params.id)
  .then(beast => res.json(beast))
  .catch(next);
});

beastRouter.put('/api/beast/:id', jsonParser, function(req, res, next) {
  debug('put: /api/beast/:id');
  Beast.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( beast => res.json(beast))
  .catch(next);
});

beastRouter.delete('/api/beast/:id', jsonParser, function(req, res, next) {
  debug('delete: /api/beast/:id');
  Beast.findByIdAndRemove(req.params.id)
  .then( () => res.json(beast))
  .catch(next);
});
