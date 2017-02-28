'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('guitar:guitar');
const createError = require('http-errors');
const storage = require('../lib/storage.js');

const Guitar = module.exports = function(name, type, make) {
  debug('guitar constructor');

  if(!name) throw createError(400, 'bad request');
  if(!type) throw createError(400, 'bad request');
  if(!make) throw createError(400, 'bad request');

  this.name = name;
  this.type = type;
  this.make = make;
  this.id = uuid.v1();
};

Guitar.createGuitar = function(_guitar) {
  debug('create guitar');
  try {
    let guitar = new Guitar(_guitar.name, _guitar.type, _guitar.make);
    return storage.createItem('guitar', guitar);
  } catch (err) {
    return Promise.reject(err);
  }
};

Guitar.fetchGuitar = function(id) {
  debug('fetch guitar');
  try {
    return storage.fetchItem('guitar', id);
  } catch (err) {
    console.log('I happened', err);
    return Promise.reject(err);
  }
};

Guitar.deleteGuitar = function(id) {
  debug('delete guitar');
  try {
    return storage.deleteItem('guitar', id);
  } catch (err) {
    return Promise.reject(err);
  }
};
