'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('neighbor:neighbor');
const storage = require('../lib/storage.js');

const Neighbor = module.exports = function(name, age, friendly){
  debug('neighbor constructor');

  if(!name) throw createError(400, 'expected name');
  if(!age) throw createError(400, 'expected age');
  if(!friendly) throw createError(400, 'expected friendly');

  this.id = uuid.v1();
  this.name = name;
  this.age = age;
  this.friendly = friendly;
};

Neighbor.createNeighbor = function(_neighbor){
  debug('createNeighbor');
  try {
    let neighbor = new Neighbor(_neighbor.name, _neighbor.age, _neighbor.friendly);
    return storage.createItem('neighbor', neighbor);
  } catch(err) {
    return Promise.reject(err);
  };
};// end createNeighbor

Neighbor.fetchNeighbor = function(id){
  debug('fetchNeighbor');
  return storage.fetchItem('neighbor', id);
};//end fetchNeighbor


Neighbor.deleteNeighbor = function(id){
  debug('deleteNeighbor');
  return storage.deleteItem('neighbor', id);
};//end deleteNeighbor
