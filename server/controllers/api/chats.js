const Chat = require('../../models/chat');
const ChatMessage = require('../../models/chatMessage');

const initiateChat = async (req, res) => {
  try {
    const existingChat = await (
      Chat.findOne({players: {$all: [req.user._id, req.body._id]}})
          .populate('players', 'username')
          .exec()
    );
    if (existingChat) {
      res.json(existingChat);
    } else {
      await Chat.create({players: [req.user._id, req.body._id]});
      const newChat = await (
        Chat.findOne({players: {$all: [req.user._id, req.body._id]}})
            .populate('players', 'username')
            .exec()
      );
      res.json(newChat);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  initiateChat
}
