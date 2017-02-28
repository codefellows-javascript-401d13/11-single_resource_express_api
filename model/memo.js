'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
//memo app and memo module hence memo memo
const debug = require('debug')('memo:memo');
const storage = require('../lib/storage.js');

const Memo = module.exports = function(title, entry) {
  debug('memo constructor');
    
  if (!title) throw createError(400, 'expected title');
  if (!entry) throw createError(400, 'expected entry');
//metadata needed
  this.id = uuid.v1();//create new id
  this.title = title;
  this.entry = entry;
};
//static method is not instantiated on the object
//interface layer to be able to create new item
Memo.createMemo = function(_memo){
  debug('createMemo', _memo);

  try{
    let memo = new Memo(_memo.title, _memo.entry);
    return storage.createMemo('memo', memo);
  } catch (err) {
    return Promise.reject(err);
  }
};

Memo.fetchMemo = function(id) {
  debug('fetchMemo', id);
  return storage.fetchItem('memo', id);
};

// Memo.updateMemo = function(id, _memo){
//   debug('updateMemo');
//   return storage.updateMemo('memo', id)
//   .catch(err => Promise.reject(createError(404, err,message)))
//   .then(_memo => {
//      try{
//     let memo = new Memo(_memo.title, _memo.entry);
//     return storage.createMemo('memo', memo);
//   } catch (err) {
//     return Promise.reject(err);
//   };
// }
// };

Memo.deleteMemo = function(id) {
  debug('deleteMemo', id);
  return storage.deleteItem('memo', id);
};





