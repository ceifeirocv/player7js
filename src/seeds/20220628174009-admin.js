const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      username: 'Administrador',
      password_hash: bcrypt.hashSync('pid96sqdi', 8),
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
