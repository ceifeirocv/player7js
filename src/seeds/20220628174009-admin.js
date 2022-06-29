const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      username: process.env.DB_ADMIN_USER,
      password_hash: bcrypt.hashSync(process.env.DB_ADMIN_PASS, 8),
      administrator: true,
      email: 'cyber.dnos@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
