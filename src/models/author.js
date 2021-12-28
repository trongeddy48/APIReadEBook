'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.Document, { foreignKey: 'authorId', as: 'authorData' });
    }
  };
  Author.init({
    nameAuthor: DataTypes.STRING,
    birthday: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
    freezeTableName: true,
  });
  return Author;
};