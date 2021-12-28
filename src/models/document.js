"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.hasOne(models.Publisher, { foreignKey: 'id', targetKey: 'namePublisher', as: 'publisherData' });
      Document.hasOne(models.Author, { foreignKey: 'id', targetKey: 'nameAuthor', as: 'authorData' });
      Document.hasOne(models.Category, { foreignKey: 'id', targetKey: 'nameCategory', as: 'categoryData' });
    }
  }
  Document.init(
    {
      nameDocument: DataTypes.STRING,
      content: DataTypes.TEXT,
      pageNumber: DataTypes.INTEGER,
      publisherId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Document",
      freezeTableName: true,
    }
  );
  return Document;
};
