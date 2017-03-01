'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:note-router');
const Cat = require('../model/cats.js');
const noteRouter = new Router();

noteRouter.post('/api/cat', jsonParser, function(req, res, next) {
  debug('POST: /api/cat');

  Cat.createItem(req.body)
  .then( note => res.json(note))
  .catch( err => next(err));
});

noteRouter.get('/api/cat/:id', function(req, res, next) {
  debug('GET: /api/cat/:id');

  Cat.fetchItem(req.params.id)
  .then( note => res.json(note))
  .catch( err => next(err));
});

noteRouter.get('/api/cat', function(req, res, next) {
  debug('GET: /api/cat')

  Cat.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

noteRouter.put('/api/cat', jsonParser, function(req, res, next) {
  debug('PUT: /api/cat');

  Cat.updateItem(req.query.id, req.body)
  .then( note => res.json(note))
  .catch(next);
});

module.exports = noteRouter;
