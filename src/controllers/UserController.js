const { Users } = require('../models');

module.exports = {
  async store(req, res) {
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
};
