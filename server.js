
'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('blog:server');

const Blog = require('./model/blog');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/blog', jsonParser, function(req, res, next) {
  debug('POST: /api/blog');

  Blog.createBlog(req.body)
  .then( blog => res.json(blog))
  .catch( err => next(err));
});

app.get('/api/blog', function(req, res, next) {
  debug('GET: /api/blog');

  Blog.fetchBlog(req.query.id)
  .then( blog => res.json(blog))
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
