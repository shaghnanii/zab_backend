'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supervisor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Supervisor.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    dob: DataTypes.STRING,
    majors: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Supervisor',
  });
  return Supervisor;
};