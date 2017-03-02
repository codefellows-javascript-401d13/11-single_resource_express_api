'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Beast = require('../model/beast.js');
const beastRouter = module.exports = new Router();

beastRouter.post('/api/beast', jsonParser, function(req, res, next) {
  req.body.timestamp = new Date();
  new Beast(req.body).save()
  .then(beast => res.json(beast))
  .catch(next);
});

beastRouter.get('/api/beast/:id', function(req, res, next) {
  Beast.findById(req.params.id)
  .then(beast => res.json(beast))
  .catch(next);
});

beastRouter.put('/api/beast', jsonParser, function(req, res, next) {
  Beast.findByIdAndUpdate(req.query.id, req.body)
  .then( beast => res.json(beast))
  .catch(next);
});

beastRouter.delete('/api/beast', jsonParser, function(req, res, next) {
  Beast.findByIdAndRemove(req.params.id)
  .then( beast => res.json(beast))
  .catch(next);
});
