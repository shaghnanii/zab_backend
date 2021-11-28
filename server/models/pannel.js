'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pannel.init({
    name: DataTypes.STRING,
    pm_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pannel',
  });
  return Pannel;
};