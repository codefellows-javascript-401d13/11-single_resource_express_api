'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('employee:employee');
const createError = require('http-errors');
const storage = require('../lib/storage.js');

const Employee = module.exports = function(name, title){
  debug('Employee constructor');
  if(!name) throw createError(400, 'name not provided');
  if(!title) throw createError(400, 'title not provided');

  this.name = name;
  this.title = title;
  this.id = uuid.v1();
};

Employee.createEmployee = function(_employee){
  debug('createEmployee');
  try{
    let employee = new Employee(_employee.name, _employee.title);
    return storage.createItem('employee', employee);
  } catch(err){
    return Promise.reject(err);
  }
};
Employee.fetchEmployee = function(id){
  debug('fetchEmployee');
  return storage.fetchItem('employee', id);
}
Employee.deleteEmployee = function(id){
  debug('deleteEmployee');
  return storage.deleteItem('employee', id);
}
