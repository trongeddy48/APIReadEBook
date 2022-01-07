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
      Document.belongsTo(models.Publisher, {
        foreignKey: "publisherId",
        targetKey: "id",
        as: "publisherData",
      });
      Document.belongsTo(models.Author, {
        foreignKey: "authorId",
        targetKey: "id",
        as: "authorData",
      });
      Document.belongsTo(models.Category, {
        foreignKey: "categoryId",
        targetKey: "id",
        as: "categoryData",
      });
      
      Document.hasMany(models.Savedoc, {
        foreignKey: "documentId",
        targetKey: "id",
        as: "savedocData",
      });
    }
  }
  Document.init(
    {
      nameDocument: DataTypes.STRING,
      content: DataTypes.TEXT,
      smallDescription: DataTypes.TEXT,
      pageNumber: DataTypes.INTEGER,
      imageDocument: DataTypes.TEXT,
      publisherId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Document",
      freezeTableName: true,
    }
  );
  return Document;
};
