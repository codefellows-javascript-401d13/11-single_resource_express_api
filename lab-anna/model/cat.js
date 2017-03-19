'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = Schema({
  gender: { type: String, required: true },
  color: { type: String, required: true },
  beastID: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('cat', catSchema);
