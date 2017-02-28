'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('tea:tea');
const storage = require('../lib/storage.js');

const Tea = module.exports = function(type, flavor) {
    debug('tea constructor');

    if (!type) throw createError(400, 'expected name');
    if (!flavor) throw createError(400, 'expected flavor');

    this.id = uuid.v1();
    this.type = type;
    this.flavor = flavor;
};

Tea.createTea = function(_tea) {
    debug('createTea');

    try {
        let tea = new Tea(_tea.type, _tea.flavor);
        return storage.createItem('tea', tea);
    } catch (err) {
        return Promise.reject(err);
    }
};

Tea.fetchTea = function(id) {
    debug('fetchTea');
    return storage.fetchItem('tea', id);
};

Tea.deleteTea = function(id) {
    debug('deleteTea');
    return storage.deleteItem('tea', id);
};