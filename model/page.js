'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('11-single_resource_express_api:page');
const storage = require('../lib/storage.js');

const Page = module.exports = function(title, steak) {
  debug('page constructor');

  if (!title) throw createError(400, 'expected title');
  if (!meat) throw createError(400, 'expected steak');

  this.id = uuid.v1();
  this.title = title;
  this.steak = steak;
};

Page.createPage = function(_page) {
  debug('createPage');

  try {
    let page = new Page(_page.title, _page.steak);
    return storage.createItem('page', page);
  }catch (err){
    return Promise.reject(err);
  }
};

Page.fetchPage = function(id) {
  debug('fetch page');
  return storage.fetchItem('note', id);
};
