'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Campus.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    zip_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Campus',
  });
  Campus.associate = models => {
    models.Campus.hasMany(models.Department, {
      foreignKey: 'campus_id'
    })
  }

  return Campus;
};