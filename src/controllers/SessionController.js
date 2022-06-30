const jwt = require('jsonwebtoken');

const { Users } = require('../models');

require('dotenv').config();

module.exports = {
  async store(req, res) {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });

    if (!user) return res.status(401).json({ error: 'User not found.' });
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }
    const { id, email } = user;

    return res.json({
      user: {
        id,
        username,
        email,
      },
      token: jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      }),
    });
  },
};
