const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  File.init({
    fileName: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `http://localhost:3333/files/${this.fileUrl}`;
      },
    },
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};
