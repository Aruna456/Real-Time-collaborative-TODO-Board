const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User registered' });
  } catch {
    res.status(400).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
