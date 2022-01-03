'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Savedoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Savedoc.belongsTo(models.Document, { foreignKey: "documentId", targetKey: "id", as: "documentData" });
      Savedoc.belongsTo(models.User, { foreignKey: "userId", targetKey: "id", as: "userData" });
    }
  };
  Savedoc.init({
    documentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Savedoc',
    freezeTableName: true,
  });
  return Savedoc;
};