const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
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
