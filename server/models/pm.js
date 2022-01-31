'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pm.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    dob: DataTypes.STRING,
    majors: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pm',
  });
  Pm.associate = models => {
    models.Pm.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    models.Pm.hasMany(models.Pannel, {
      foreignKey: 'pm_id'
    })
    models.Pm.hasMany(models.Assessment, {
      foreignKey: 'pm_id'
    })
  }
  return Pm;
};