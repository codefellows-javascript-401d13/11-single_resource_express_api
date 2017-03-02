'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beastSchema = Schema({
  kind: { type: String, required: true},
  timestamp: { type: Date, required: true}
});

module.exports = mongoose.model('beast', beastSchema);
