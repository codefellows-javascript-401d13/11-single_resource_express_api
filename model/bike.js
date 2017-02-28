'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('bike:bike');
const createError = require('http-errors');
const storage = require(`${__dirname}/../lib/storage.js`);

const Bike = module.exports = function(brand, type) {
  debug('bike constructor');

  if (!brand) throw createError(400, 'bike brand expected');
  if (!type) throw createError(400, 'bike type expected');

  this.id = uuid.v1();
  this.brand = brand;
  this.type = type;
};

Bike.createBike = function(_bike) {
  debug('createBike');

  try {
    let bike = new Bike(_bike.brand, _bike.type);
    return storage.createItem('bike', bike);
  } catch(err) {
    return Promise.reject(err);
  }
};

Bike.fetchBike = function(id) {
  debug('fetchBike');
  return storage.fetchItem('bike', id);
};

Bike.deleteBike = function(id) {
  debug('deleteBike');
  return storage.deleteItem('bike', id);
};
