'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Document, { foreignKey: 'categoryId', targetKey: "id", as: 'categoryData' })
    }
  };
  Category.init({
    nameCategory: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageCategory: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true,
  });
  return Category;
};