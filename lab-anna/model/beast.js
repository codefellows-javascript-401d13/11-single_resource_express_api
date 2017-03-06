'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('cat:beast');
const Schema = mongoose.Schema;

const Cat = require('./cat.js');

const beastSchema = Schema({
  kind: { type: String, required: true},
  timestamp: { type: Date, required: true},
  cats: [{ type: Schema.Types.ObjectId, ref: 'cat'}]
});

const Beast = module.exports = mongoose.model('beast', beastSchema);

Beast.findByIdAndAddCat = function(id, cat) {
  debug('findByIdAndAddCat');

  return Beast.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( beast => {
    cat.beastID = beast._id;
    this.tempBeast = beast;
    return new Cat(cat).save();
  })
  .then( cat => {
    this.tempBeast.cats.push(cat._id);
    this.tempCat = cat;
    return this.tempBeast.save();
  })
  .then( () => {
    return this.tempCat;
  });
};
