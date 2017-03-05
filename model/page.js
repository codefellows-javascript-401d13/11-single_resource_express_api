'use strict';

const express = require('express');
const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('page:page');
const storage = require('../lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

const Page = module.exports = function(title, steak) {
  debug('page constructor');

  if (!title) throw createError(400, 'expected title');
  if (!steak) throw createError(400, 'expected steak');

  this.id = uuid.v1();
  this.title = title;
  this.steak = steak;
};

Page.createPage = function(_page) {
  debug('createPage');

  try {
    let page = new Page(_page.title, _page.steak);
    return storage.createItem('page', page);
  }catch (err){
    return Promise.reject(err);
  };
};

app.get('/api/page/:id', function(req, res, next) {
  debug('GET: /api/page');

  Page.fetchPage(req.query.id)
  .then(note => res.json(note))
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

err = createError(500, err.message)
})

Page.fetchPage = function(id) {
  debug('fetchPage');
  return storage.fetchItem('page', id);
};
