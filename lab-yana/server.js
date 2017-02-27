'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const parseJSON = require('body-parser').json();
const debug = require('debug')('blog:server');

const Blog = require('./model/blog.js');

const PORT = 3003;
const app = express();

app.use(morgan('dev'));

app.post('/api/blog', parseJSON, function(req, res, next) {
  debug('POST: /api/blog');
  Blog.createBlog(req.body)
  .then(blog => res.json(blog))
  .catch(err => next(err));
});

app.get('/api/blog/:id', function(req, res, next) {
  debug('GET: /api/blog');
  console.log('id', req.params.id);
  Blog.fetchBlog(req.params.id)
  .then(blog => res.json(blog))
  .catch(err => next(err));
});

app.use(function(err, req, res) {
  debug('error middleware');
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.message);
});

app.listen(PORT, () => {
  debug('server up', PORT);
});
