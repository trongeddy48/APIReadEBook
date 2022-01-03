"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publisher.hasMany(models.Document, {
        foreignKey: "publisherId",
        targetKey: "id",
        as: "publisherData",
      });
    }
  }
  Publisher.init(
    {
      namePublisher: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      imagePublisher: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Publisher",
      freezeTableName: true,
    }
  );
  return Publisher;
};
