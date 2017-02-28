'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('food:food');
const storage = require('../lib/storage.js');

const Food = module.exports = function(name, meal) {
  debug('food constructor');

  if(!name) throw createError(400, 'expected name');
  if(!meal) throw createError(400, 'expected meal');

  this.id = uuid.v1();
  this.name = name;
  this.meal = meal;
};

Food.createFood = function(_food) {
  debug('createFood');

  try {
    let food = new Food(_food.name, _food.meal);
    return storage.createItem('food', food);
  } catch (err) {
    return Promise.reject(err);
  }
};

Food.fetchFood = function(id) {
  debug('fetchFood');
  return storage.fetchItem('food', id);
};

Food.deleteFood = function(id) {
  debug('deleteFood');

  return storage.deleteItem('food', id);
};
