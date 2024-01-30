const express = require('express');
const router = express.Router();
const chatsController = require('../../controllers/api/chats');

router.post('/initiate', chatsController.initiateChat);
router.post('/save-message', chatsController.saveMessageToChat);

module.exports = router;
