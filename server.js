'use strict';

const express = require('express');
// const Promise = require('bluebird');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('page:server');

const Page = require('./model/page.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'test route worked'});
});

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
  console.log('whatt up!');
});
