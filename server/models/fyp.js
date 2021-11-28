'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fyp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Fyp.init({
    name: DataTypes.STRING,
    type: DataTypes.ENUM,
    level: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    pannel_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fyp',
  });
  return Fyp;
};