const { Op } = require('sequelize');
const { Users } = require('../models');

module.exports = {
  async store(req, res) {
    const userExists = await Users.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.email },
        ],
      },
    });
    if (userExists.username === req.body.username) {
      return res.status(404).json({ error: 'Username already taken.' });
    }
    if (userExists.email === req.body.email) {
      return res.status(404).json({ error: 'User with provided email already exists' });
    }

    const {
      id,
      username,
      email,
      administrator,
    } = await Users.create(req.body);

    return res.json({
      id,
      username,
      email,
      administrator,
    });
  },
  async getUsers(req, res) {
    const user = await Users.findAll({
      attributes: ['id', 'username', 'email'],
    });

    return res.json(user);
  },
  async update(req, res) {
    return res.json({ id: req.userId, message: 'user updated' });
  },
};
