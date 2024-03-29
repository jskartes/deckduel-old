const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

const createJWT = user => {
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'});
}

const getAllUsers = async (req, res) => {
  const allUsers = await (
    User.find({username: {$nin: [req.user.username]}})
        .collation({locale: 'en', strength: 1})
        .sort({username: 'asc'})
  );
  res.json(allUsers);
}

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) throw new Error();
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) throw new Error();
    user.isOnline = true;
    await user.save();
    res.json(createJWT(user));
  } catch (error) {
    res.status(400).json(error);
  }
}

const logoutUser = async (req, res) => {
  const user = await User.findOne({username: req.user.username});
  user.isOnline = false;
  await user.save();
  res.json('Logout successful');
}

const getFriends = async (req, res) => {
  const user = await (
    User.findOne({username: req.user.username})
        .populate('friends')
        .exec()
  );
  res.json(user.friends);
}

module.exports = {
  getAllUsers,
  getFriends,
  loginUser,
  logoutUser,
  registerUser
}
