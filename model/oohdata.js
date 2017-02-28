'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('oohdata:oohdata');
const storage = require('../lib/storage.js');

const Oohdata = module.exports = function(name, content, animal) {
  debug('Inside the Oohdata constructor');

  if(!name) throw createError(400, 'expected name');
  if(!content) throw createError(400, 'expected content');
  if(!animal) throw createError(400, 'expected a frickin animal');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
  this.animal = animal;
};

Oohdata.createOohdata = function(_oohdata) {
  debug('createOohdata');

  try {
    let oohdata = new Oohdata(_oohdata.name, _oohdata.content, _oohdata.animal);
    return storage.createItem('oohdata', oohdata);
  } catch (err) {
    return Promise.reject(err);
  }
};

Oohdata.fetchOohdata = function(id) {
  debug('fetch Oohdata');
  return storage.fetchOohdata('oohdata', id);
};

Oohdata.deleteItem = function(id) {
  debug('delete Oohdata');
  return storage.deleteItem('oohdata', id);
}
