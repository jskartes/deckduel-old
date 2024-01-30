const Chat = require('../../models/chat');

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
      const newChat = await (
        Chat.create({players: [req.user._id, req.body._id]})
      );
      const populatedNewChat = await (
        Chat.findById(newChat._id)
            .populate('players', 'username')
            .exec()
      );
      res.json(populatedNewChat);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

const saveMessageToChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.body.chat._id);
    const messageCount = chat.messages.push({
      author: req.user._id,
      content: req.body.messageContent
    });
    await chat.save();
    res.json(chat.messages[messageCount - 1]);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  initiateChat,
  saveMessageToChat
}
