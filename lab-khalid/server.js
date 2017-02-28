'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const debug = require('debug')('employee:server');
const morgan = require('morgan');
const Employee = require('./model/employee.js');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'test route worked' });
});

app.post('/api/employee', jsonParser, function(req,res, next){
  debug('POST /api/employee');
  Employee.createEmployee(req.body)
  .then(employee => res.json(employee))
  .catch(err => next(err));
});

app.get('/api/employee/:id', function(req, res, next){
  debug('GET /api/employee');
  console.log('<<<<<<<', req.params.id, '>>>>>>>>>>>')
  if(req.params.id === null) {
    res.status(400).send('Bad request');
    // next();
    return;
  }
  Employee.fetchEmployee(req.params.id)
  .then(data => res.json(data))
  .catch(err => next(err));
});
app.get('/api/employee', function(req, res, next){
  debug('GET /api/employee/no id');
  // if(req.url.query.id) return;
  res.status(400).send('Bad request');
  // next();
})
app.delete('/api/employee/:id', function(req, res, next){
  debug('DELETE /api/employee');
  Employee.deleteEmployee(req.params.id);
  res.status(204).send(`deleted the employee with the id ${req.params.id}`);
  // next();
});
app.use('*', function(req, res, next){
  debug('the default 404 response');
  res.status(404).send('Route not found');
})

app.use(function(err, req, res){
  debug('Error middleware');
  console.error(err.message);
  if(err.status){
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});


app.listen(PORT, () => debug('Server up at port ', PORT));
