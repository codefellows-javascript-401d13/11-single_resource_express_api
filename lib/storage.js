'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('note:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!item) return Promise.reject(createError(400, 'expected item'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');
  console.log('in fetch item : ', schemaName, id)
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch(err){
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
    if(!id) return Promise.reject(createError(400, 'expected id'));
    fs.unlink(`${__dirname}/../data/${schemaName}/${id}.json`, function(e){
      if(e) console.log(e);
      if(e) return reject(e);
      resolve();
    });
  });
};
