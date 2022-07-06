const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Products, {
        foreignKey: {
          name: 'typeId',
          allowNull: false,
        },
      });
    }
  }
  ProductTypes.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductTypes',
  });
  return ProductTypes;
};
