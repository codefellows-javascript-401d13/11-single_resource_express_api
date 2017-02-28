'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('bike:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

//need debug, http-errors support

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  debug('createItem');

  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!item) return Promise.reject( createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item) //whuck? look into this format. return item implied with function.
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schemaName, id){
  debug('fetchItem', schemaName, typeof(id));

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch (err => Promise.reject(createError(404, err.message)));
};

exports.fetchAllItems = function(schemaName){
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));

  return fs.readdirProm(`${__dirname}/../data/bike`)
  .then( data => {
    try{
      let items = {};
      for (var key of data.keys()) {
        items[key] = data[key];
      }
      return data;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch (err => Promise.reject(createError(404, err.message)));
};
exports.deleteItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( () => id)
  .catch( err => Promise.reject(createError(500, err.message)));
};



