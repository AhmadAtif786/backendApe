const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { defaultsDeep } = require("lodash");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, username, confirm_password } = req.body;

  try {
    const user = await User.signup(username, email, password, confirm_password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const id=req.user._id;
  try {
    const user = await User.findById(id); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({name:user.username});
  } catch (err) {
    res.status(400).json({ message: 'Internal server error' });
  }

};

module.exports = { signupUser, loginUser, getUser };
