'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Proposal.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    type: DataTypes.ENUM(['Web', 'Android', 'IOS', 'Web/Mobile', 'IOS/Android', 'Machine Learning', 'Unity', 'Game']),
    level: DataTypes.ENUM(['1', '2']),
    fyp_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proposal',
  });
  return Proposal;
};