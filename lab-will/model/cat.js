'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('cat:cat');
const storage = require('../lib/storage.js');

const Cat = module.exports = function(came, content) {
  debug('cat constructor');

  if(!name) throw createError(400, 'expected name');
  if(!content) throw createError(400, 'expected name');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Cat.createCat = function(_cat) {
  debug('createCat');

  try{
    let cat = new Cat(_cat.name, _cat.content);
    return storage.createItem('cat', cat);
  } catch (err) {
    return Promise.reject(err);
  }
};

Cat.fetchCat = function(id) {
  debug('fetchCat');
  return storage.fetchItem('cat', id);
}
