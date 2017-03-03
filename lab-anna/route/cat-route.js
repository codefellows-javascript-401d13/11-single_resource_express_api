'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const Cat = require('../model/cat.js');
const catRouter = module.exports = new Router();

catRouter.post('/api/cat', jsonParser, function(req, res, next) {
  if (Object.keys(req.body).length === 0) return next(createError(400, 'bad request'));
  req.body.timestamp = new Date();
  new Cat(req.body).save()
  .then(cat => res.json(cat))
  .catch(next);
});

catRouter.get('/api/cat/:id', function(req, res, next) {
  console.log('req.params.id', req.params.id);
  if (!req.params.id) return next(createError(404, 'not found'));
  Cat.findById(req.params.id)
  .then(cat => res.json(cat))
  .catch(next);
});

catRouter.put('/api/cat/:id', jsonParser, function(req, res, next) {
  console.log('req.params.id', req.params.id);
  console.log('req.body', req.body);
  if (Object.keys(req.body).length === 0) return next(createError(400, 'bad request'));
  if (!req.params.id) return next(createError(404, 'not found'));
  Cat.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( cat => res.json(cat))
  .catch(next);
});

catRouter.delete('/api/cat', jsonParser, function(req, res, next) {
  Cat.findByIdAndRemove(req.params.id)
  .then( cat => res.json(cat))
  .catch(next);
});
