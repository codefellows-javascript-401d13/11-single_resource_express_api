'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('rwby:rwby');
const storage = require('../lib/storage.js');

const Rwby = module.exports = function(name, weapon){ //eslint-disable-line
  debug('rwby constructor');

  if(!name) throw createError(400, 'expected name');
  if(!weapon) throw createError(400, 'expected weapon');
  this.id = uuid.v1();
  this.name = name;
  this.weapon = weapon;
};

Rwby.createRwby = function(_rwby) {
  debug('createRwby');

  try{
    let rwby = new Rwby(_rwby.name, _rwby.weapon);
    return storage.createItem('rwby', rwby);
  } catch (err) {
    return Promise.reject(err);
  }
};

Rwby.fetchRwby = function(id){
  debug('fetchRwby');
  return storage.fetchItem('rwby', id);
};

Rwby.deleteRwby = function(schemaName, id){
  debug('deleteRwby');
  return storage.deleteItem(schemaName, id);
};
