'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('bike:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');

  if (!schemaName) return Promise.reject(new createError(400, 'expected schema name'));
  if (!item) return Promise.reject(new createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => {
    return Promise.reject(new createError(500, err.message));
  });
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');
  if (!schemaName) return Promise.reject(new createError(400, 'schema expected'));
  if (!id) return Promise.reject(new createError(400, 'id expected'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let foundItem = JSON.parse(data.toString());
      return foundItem;
    } catch (err) {
      return Promise.reject(new createError(500, err.message));
    }
  })
  .catch( err => {
    return Promise.reject(new createError(404, err.message));
  });
};

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');

  if (!schemaName) return Promise.reject(new createError(400, 'schema expected'));
  if (!id) return Promise.reject(new createError(400, 'id expected'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then()
  .catch( err => {
    return Promise.reject(new createError(500, err.message));
  });
};

exports.fetchAllItems = function(schemaName) {
  debug('fetchAllItems');

  if(!schemaName) return Promise.reject(new createError(400, 'schema expected'));

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then( items => {
    try {
      let itemNames = items.join(', ');
      return itemNames;
    } catch (err) {
      return Promise.reject(new createError(500, err.message));
    }
  })
  .catch( err => Promise.reject(new createError(404, err.message)));
};
