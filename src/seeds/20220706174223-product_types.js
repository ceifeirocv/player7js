module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ProductTypes', [{
      type: 'Bebidas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'FastFood',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'Pizzas',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ProductTypes', null, {});
  },
};
