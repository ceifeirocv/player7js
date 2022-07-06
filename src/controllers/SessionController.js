const jwt = require('jsonwebtoken');
const Yup = require('yup');

const { Users } = require('../models');

require('dotenv').config();

module.exports = {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required().min(8),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { username, password } = req.body;
    const user = await Users.findOne({
      where: { username },
    });

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
