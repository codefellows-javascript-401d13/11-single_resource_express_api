'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('note:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom' });

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');

  if(!schemaName) return Promise.reject(createError(400,'No schema name provided'));
  if(!item) return Promise.reject(createError(400, 'No item provided'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');

  if(!schemaName) return Promise.reject(createError(400, 'No schema name provided'));
  if(!id) return Promise.reject(createError(400, 'no id provided'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');

  return new Promise((resolve, reject) => {
    fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( () => resolve())
    .catch(err => {
      console.error(err);
      return reject(err);
    });
  });
};
