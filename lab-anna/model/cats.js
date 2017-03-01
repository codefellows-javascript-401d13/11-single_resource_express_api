'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('cat:cat');
const storage = require('../lib/storage.js');

const Cat = module.exports = function(gender, color) {
  debug('cat constructor');

  if (!gender) throw createError(400, 'expected gender');
  if (!color) throw createError(400, 'expected color');

  this.id = uuid.v1();
  this.gender = gender;
  this.color = color;
};

Cat.createItem = function(_cat) {
  debug('createItem');

  try {
    let cat = new Cat(_cat.gender, _cat.color);
    return storage.createItem('cat', cat);
  } catch (err) {
    return Promise.reject(err);
  };
};

Cat.updateItem = function(id, _cat) {
  debug('update cat');

  return storage.fetchItem('cat', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( cat => {
    for (var prop in cat) {
      if (prop === 'id') continue;
      if (_cat[prop]) cat[prop] = _cat[prop];
    };
    return storage.createItem('cat', cat);
  });
};

Cat.fetchItem = function(id) {
  debug('fetch cat');
  return storage.fetchItem('cat', id);
};

Cat.deleteItem = function(id) {
  debug('delete cat');
  return storage.fetchItem('cat', id);
};

Cat.fetchIDs = function() {
  debug('fetch IDs');
  return storage.availIDs('cat');
}
