'use strict';

const express = require('express');
const Promise = require('bluebird');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');

const Page = require('./model/page.js');
const storage = require('./lib/storage.js');

const PORT = 3000;
const app = express();

app.use(morgan('dev'));

app.
