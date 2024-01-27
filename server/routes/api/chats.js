const express = require('express');
const router = express.Router();
const chatsController = require('../../controllers/api/chats');

router.post('/initiate', chatsController.initiateChat);

module.exports = router;
