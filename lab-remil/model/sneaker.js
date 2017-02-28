'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('sneaker:sneaker');
const storage = require('../lib/storage.js');
const createError = require('http-errors');

const Sneaker = module.exports = function(model, brand) {
  debug('sneaker constructor');

  if (!model) throw createError(400, 'expected model');
  if (!brand) throw createError(400, 'expected brand');

  this.id = uuid.v4();
  this.model = model;
  this.brand = brand;
};

Sneaker.createSneaker = function(_sneaker) {
  debug('createSneaker');

  try {
    let sneaker = new Sneaker(_sneaker.model, _sneaker.brand);
    return storage.createItem('sneaker', sneaker);
  } catch (err) {
    return Promise.reject(err);
  }
};

Sneaker.fetchSneaker = function(id) {
  debug('fetchSneaker');

  return storage.fetchItem('sneaker', id);
};

Sneaker.deleteSneaker = function(id) {
  debug('deleteSneaker');

  return storage.deleteItem('sneaker', id);
};
