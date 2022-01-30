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
    type: DataTypes.ENUM(['web', 'android', 'ios', 'web-mobile', 'ios-android', 'machine-learning', 'unity', 'game']),
    level: DataTypes.ENUM(['1', '2']),
    desc: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Fyp',
  });

  Fyp.associate = models => {
    models.Fyp.hasMany(models.Attendance, {
      foreignKey: 'fyp_id',
    })
    models.Fyp.hasOne(models.Proposal, {
      foreignKey: 'fyp_id',
    })
    models.Fyp.hasMany(models.Assessment, {
      foreignKey: 'fyp_id',
    })
    models.Fyp.hasMany(models.Result, {
      foreignKey: 'fyp_id',
    })
    models.Fyp.hasOne(models.Group, {
      foreignKey: 'fyp_id',
    })
  }
  return Fyp;
};