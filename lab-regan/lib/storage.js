'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('neighbors:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  debug('createItem');
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!item) return Promise.reject(createError(400, 'expected object'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item )
  .catch( err => Promise.reject(createError(500, err.message)));
};//end createItem

exports.fetchItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(createError(400, 'expected schema'));
  if(!id) return Promise.reject(createError(400, 'expected id'));
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( thing => {
    try {
      let item = JSON.parse(thing.toString());
      return item;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch( err => Promise.reject(createError(400, err.message)));
};//end fetchItem
