module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn(
      'Products',
      'imageId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Files',
          key: 'id',
        },
      },
      { transaction: t },
    ),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Products', 'imageId', { transaction: t }),
  ])),
};
