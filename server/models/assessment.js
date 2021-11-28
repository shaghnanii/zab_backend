'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Assessment.init({
    question: DataTypes.TEXT,
    total_mark: DataTypes.INTEGER,
    obtained_mark: DataTypes.INTEGER,
    level: DataTypes.ENUM(['1', '2']),
    fyp_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Assessment',
  });
  return Assessment;
};