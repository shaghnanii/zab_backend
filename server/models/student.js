'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  };
  Student.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    dob: DataTypes.STRING,
    majors: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    batch: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });

  Student.associate = models => {
    models.Student.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    models.Student.belongsTo(models.Group, {
      foreignKey: 'group_id',
    });
  }
  return Student;
};