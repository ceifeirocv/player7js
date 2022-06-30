module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      administrator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
