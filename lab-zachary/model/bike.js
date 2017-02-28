'use strict';

const createError = require('http-errors');
const uuid = require('node-uuid');
const storage = require('../lib/storage.js');
const debug = require('debug')('bike:bike'); //(appname)(modulename)

//bike data model. need  name, message and node-uuid to generate unique id

const Bike = module.exports = function(name, description){
  if (!name) throw createError(400, 'name expected');
  if (!description) throw createError(400, 'description expected');

  this.id = uuid.v4();
  this.name = name;
  this.description = description;
};

//static method interface with storage module

Bike.createEntry = function(_bike){
  debug('createEntry', _bike);
  try{
    let bike = new Bike(_bike.name, _bike.content);
    return storage.createItem('bike', bike);
  } catch (err) {
    return Promise.reject(err);
  }
};

Bike.fetchEntry = function(id){
  debug('fetchEntry', id);

  return storage.fetchItem('bike', id);
};
Bike.deleteEntry = function(id){
  debug('deleteEntry');

  return storage.deleteItem('bike', id);
};