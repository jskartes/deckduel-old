const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

const createJWT = user => {
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'});
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
  console.log(req.body);
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

module.exports = {
  loginUser,
  logoutUser,
  registerUser
}
