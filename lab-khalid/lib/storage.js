'use strict';
const debug = require('debug')('employee:storage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});



module.exports = exports = {};

exports.createItem = function(schemaname, item){
  debug('createItem ');
  if(!schemaname) return Promise.reject(createError(400, 'Schemaname not provided'));
  if(!item) return Promise.reject(createError(400, 'Item not provided'));
  let json  = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaname}/${item.id}.json`, json)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)))
}

exports.fetchItem = function(schemaname, id){
  debug('fetchItem');
  if(!schemaname) return Promise.reject(createError(400, 'Schemaname not provided'));
  if(!id) return Promise.reject(createError(400, 'Id not provided'));
  return fs.readFileProm(`${__dirname}/../data/${schemaname}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item
    } catch(err){
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch(err => Promise.reject(createError(404, err.message)));
}

exports.deleteItem = function(schemaname, id){
  debug('deleteItem');
  if(!schemaname) return Promise.reject(createError(400, 'Schemaname not provided'));
  if(!id) return Promise.reject(createError(400, 'Id not provided'));
  return fs.unlinkProm(`${__dirname}/../data/${schemaname}/${id}.json`)
}
