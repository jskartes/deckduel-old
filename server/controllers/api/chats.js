const Chat = require('../../models/chat');

const initiateChat = async (req, res) => {
  try {
    const existingChat = await (
      Chat.findOne({players: {$all: [req.user._id, req.body._id]}})
    );
    if (existingChat) {
      res.json(existingChat);
    } else {
      const newChat = await (
        Chat.create({players: [req.user._id, req.body._id]})
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
