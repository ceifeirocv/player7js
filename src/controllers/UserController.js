const { Op } = require('sequelize');
const Yup = require('yup');

const { Users } = require('../models');

module.exports = {
  async store(req, res) {
    const userIsAdmin = await Users.findOne({ where: { id: req.userId } });
    if (!userIsAdmin.administrator) return res.status(401).json({ erro: 'Not Authorized' });

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExists = await Users.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.email },
        ],
      },
    });
    if (userExists && userExists.username === req.body.username) {
      return res.status(404).json({ error: 'Username already taken.' });
    }
    if (userExists && userExists.email === req.body.email) {
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
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string().required().min(8),
      newPassword: Yup.string().min(8),
      newPasswordConfirm: Yup.string().min(8)
        .when(
          'newPassword',
          (newPassword, field) => (newPassword ? field.required() : field),
        ),
      administrator: Yup.boolean(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      email,
      password: oldPassword,
      newPassword: password,
      newPasswordConfirm,
      administrator,
    } = req.body;

    const user = await Users.findByPk(req.userId);

    if (!oldPassword || !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    if (email) {
      const userExists = await Users.findOne({ where: { email } });
      if (userExists && userExists.email === email) {
        return res.status(404).json({ error: 'User with provided email already exists' });
      }
    }
    if (password !== newPasswordConfirm) return res.status(401).json({ error: 'passwords does not match' });

    const {
      id,
      username,
    } = await user.update({ password, email, administrator });

    return res.json({
      id,
      username,
      email,
      administrator,
    });
  },
  // eslint-disable-next-line consistent-return
  async delete(req, res) {
    const userIsAdmin = await Users.findOne({ where: { id: req.userId } });
    if (!userIsAdmin.administrator) return res.status(401).json({ erro: 'Not Authorized' });

    // const userToDelete = await Users.findOne({ where: { id: req.body.id } });
    await Users.destroy({
      where: {
        id: req.body.id,
      },
    }).then((count) => {
      if (!count) {
        return res.status(404).json({ error: 'No user' });
      }
      return res.status(200).json({ message: `user ${req.body.id} deleted` });
    })
      .catch(() => res.status(404).json({ erro: 'no Id' }));
  },
};
