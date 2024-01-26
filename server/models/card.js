const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  image: URL,
  cardSet: String,
  attributes: {}
}, {
  timestamps: true
});

module.exports = model('Card', cardSchema);
