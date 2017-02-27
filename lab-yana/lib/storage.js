'use strict';

const Promise = require('bluebird'); //library that allows us to promisify modules
const createError = require('http-errors');
const debug = require('debug')('blog:storage');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' } ); //any function with that suffix has been promisified

module.exports = exports = {};

exports.createItem = function(schemaName, item) { // called for POST
  debug('createItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!item) return Promise.reject(createError(400, 'expected item'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item) //return item (blog in this case) object; blog-route.js gets response
  .catch(err => Promise.reject(createError(404, err.message))); //reject promise if file isn't successfully written;
};

exports.fetchItem = function(schemaName, id) { //called for GET
  debug('fetchItem');
  if (!schemaName) return Promise.reject(createError(400,'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try { return JSON.parse(data.toString()); }
    catch (err) { return Promise.reject(createError(400, err.message)); }
  })
  .catch (err => Promise.reject(createError(404, err.message)));
};


exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( res => {
    return res;
  })
  .catch(err => { return Promise.reject(createError(500, err.message)); }) ;
};

exports.changeItem = function(schemaName, id, newContent) {
  debug('changeItem');
  if (!newContent) return Promise.reject(createError(400, 'expected item'));
  let item = exports.fetchItem(schemaName, id);
  console.dir('item', item);
};

// exports.fetchList = function(schemaName) {
//   return new Promise((resolve, reject) => {
//     if (!schemaName) return reject(new Error('expected schema name'));
//     let list = fs.readdir(`${__dirname}/../data/${schemaName}`);
//     console.log('list', list);
//     if (list.length === 0) return resolve(`no ${schemaName} entries available`);
//     if (list !== null) resolve(list);
//     resolve();
//   });
// };

exports.fetchList = function(schemaName) {
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  let list = fs.readdir(`${__dirname}/../data/${schemaName}`, function() {
    try { return JSON.parse(list.toString()); }
    catch(err) { return Promise.reject(createError(500, err.message)); }
  });
  console.log('list', list);
  return list;
  //   {
  //   try {
  //     console.log('list', list);
  //     if (list.length === 0) return 'no blog entries available';
  //     return Promise.resolve(list);
  //   } catch(err) { return Promise.reject(err); }
  // })
};
