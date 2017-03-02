'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Cat = require('../model/cat.js');
const catRouter = module.exports = new Router();

catRouter.post('/api/cat', jsonParser, function(req, res, next) {
  req.body.timestamp = new Date();
  new Cat(req.body).save()
  .then(cat => res.json(cat))
  .catch(next);
});

catRouter.get('/api/cat/:id', function(req, res, next) {
  Cat.findById(req.params.id)
  .then(cat => res.json(cat))
  .catch(next);
});

catRouter.put('/api/cat', jsonParser, function(req, res, next) {
  Cat.findByIdAndUpdate(req.query.id, req.body)
  .then( cat => res.json(cat))
  .catch(next);
});

catRouter.delete('/api/cat', jsonParser, function(req, res, next) {
  Cat.findByIdAndRemove(req.params.id)
  .then( cat => res.json(cat))
  .catch(next);
});
