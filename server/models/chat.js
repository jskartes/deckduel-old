const { Schema, model } = require('mongoose');

const chatMessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    maxlength: 200
  },
  timestamp: {
    type: Date,
    default: new Date(Date.now())
  }
}, {
  timestamps: true
});

const chatSchema = new Schema({
  players: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  messages: [chatMessageSchema]
}, {
  timestamps: true
});

module.exports = model('Chat', chatSchema);
