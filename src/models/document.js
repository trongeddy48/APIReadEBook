'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Document.init({
    nameDocument: DataTypes.STRING,
    content: DataTypes.TEXT,
    pageNumber: DataTypes.INTEGER,
    publisherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};