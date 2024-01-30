const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users');

router.get('/', usersController.getAllUsers);
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/get-friends', usersController.getFriends);
router.get('/logout', usersController.logoutUser);

module.exports = router;
