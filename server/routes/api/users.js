const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users');

router.get('/', usersController.getAllUsers);
router.get('/get-friends', usersController.getFriends);
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);

module.exports = router;
