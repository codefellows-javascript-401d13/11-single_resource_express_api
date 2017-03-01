'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('journal:journal');
const storage = require('../lib/storage.js');

const Journal = module.exports = function(author, entries) {
  debug('journal constructor');

  if (!author) throw createError(400, 'expected author');
  if (!entries) throw createError(400, 'expected entries');

  this.id = uuid.v1();
  this.author = author;
  this.entries = entries;
};

Journal.createJournal = function(_journal) {
  debug('createJournal');

  try {
    let journal = new Journal(_journal.author, _journal.entries);
    return storage.createItem('journal', journal);
  } catch (err) {
    return Promise.reject(err);
  }
};

Journal.fetchJournal = function(id) {
  debug('fetchJournal');
  return storage.fetchItem('journal', id);
};


//delete method below
Journal.deleteJournal = function(id) {
  debug('deleteJournal', id);
  return storage.deleteItem('journal', id);
};
