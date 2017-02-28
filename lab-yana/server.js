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
  if (!req.body.id) {
    Blog.createBlog(req.body)
    .then(blog => res.json(blog))
    .catch(err => next(err));
    return;
  }
  Blog.updateBlog(req.body)
  .then(blog => res.json(blog))
  .catch(err => next(err));
});

app.post('/api/blog/:id', function(req, res, next) { //sort of a put method
  debug('POST(update): /api/blog');
  Blog.updateBlog(req.params.id, req.body)
  .then(blog => { res.json(blog); })
  .catch(err => next(err));
});

app.get('/api/blog/:id', function(req, res, next) {
  debug('GET: /api/blog');
  Blog.fetchBlog(req.params.id)
  .then(blog => res.json(blog))
  .catch(err => next(err));
});

app.get('/api/blog', parseJSON, function(req, res, next){
  debug('GET list: /api/blog');
  Blog.fetchBlogList()
  .then(list => { res.json(list); })
  .catch(err => next(err));
});

app.delete('/api/blog/:id', function(req, res, next) {
  debug('DELETE: /api/blog');
  Blog.deleteBlog(req.params.id)
  .then( () => {
    res.sendStatus(204);
    res.json();
  })
  .catch(err => next(err));
});


app.all('*', function(err, req, res, next) {
  debug('ALL: *');
  err = createError(404, 'not found');
  res.status(err.status).send(err.message);
  next();
});

// app.use(function(err, req, res) {
//   debug('error middleware');
//   if (err.status) {
//     res.status(err.status).send(err.message);
//     return;
//   }
//   err = createError(500, err.message);
//   res.status(err.status).send(err.message);
// });

app.listen(PORT, () => {
  debug('server up', PORT);
});
