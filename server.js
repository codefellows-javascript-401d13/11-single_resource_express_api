'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('page:server');

const Page = require('./model/page.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/page', jsonParser, function(req, res, next) {
  debug('POST: /api/page');
  Page.createPage(req.body)
  .then(page => res.json(page))
  .catch(err =>> next(err));
});

app.get('/api/page/:id', function(req, res, next) {
  debug('GET: /api/page');
});

app.fetchPage(req.params.id)
.then(page => res.json(page))
.catch(err => next(err));
});

app.delete('/api/page:id', function(req, res, next) {
  debug('DELETE: /api/page');

  Page.deletePage(req.params.id)
  .then( () => res.sendSTatus(204))
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');

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
