'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('tea:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
    debug('createItem');
    
    if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
    if (!item) return Promise.reject(createError(400, 'expected item'));

    let json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schemaName, id) {
    debug('fetchItem');

    if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
    if (!id) return Promise.reject(createError(400, 'expected id'));

    return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(data => {
        try {
            let item = JSON.parse(data.toString());
            return item;
        } catch (err) {
            return Promise.reject(createError(500, error.message));
        }
    })
    .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id) {
    debug('deleteItem');

    if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
    if (!item) return Promise.reject(createError(400, 'expected item'));

    return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .catch( err => Promise.reject(createError(500, err.message)));
};