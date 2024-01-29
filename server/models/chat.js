const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  players: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  messages: {
    type: [Schema.Types.ObjectId],
    ref: 'ChatMessage',
    default: []
  }
}, {
  timestamps: true
});

module.exports = model('Chat', chatSchema);
