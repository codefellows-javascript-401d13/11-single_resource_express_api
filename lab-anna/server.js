'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('note:server');
const app = express();

const beastRouter = require('./route/beast-route.js')
const catRouter = require('./route/cat-route.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/listdev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(morgan('dev'));
app.use(cors);
app.use(catRouter);
app.use(errors);

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
