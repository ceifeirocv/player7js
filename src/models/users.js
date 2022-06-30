/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    static associate(models) {
      // define association here
    } */
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
    administrator: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.addHook('beforeSave', async (user, options) => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });
  Users.prototype.checkPassword = async function checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return Users;
};
