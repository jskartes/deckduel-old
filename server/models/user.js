const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const deckSchema = newSchema({
  name: {
    type: String,
    required: true
  },
  cards: {
    type: [Schema.Types.ObjectId],
    ref: 'Card'
  }
}, {
  timestamps: true
});

const userCollectionSchema = new Schema({
  cards: {
    type: [Schema.Types.ObjectId],
    ref: 'Card'
  },
  decks: [deckSchema]
}, {
  timestamps: true
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: /[A-Za-z0-9]_*/,
    unique: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  currency: {
    type: Number,
    default: 0
  },
  userCollection: userCollectionSchema
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model('User', userSchema);
