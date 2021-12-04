'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    reg_id: DataTypes.INTEGER,
    password_status: DataTypes.BOOLEAN,
    reset_code: DataTypes.STRING,
    image: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });

  User.associate = models => {
    models.User.belongsTo(models.Role, {
      foreignKey: 'role_id',
    });

    models.Student.hasOne(models.Student, {
      foreignKey: 'user_id',
    });

  }

  return User;
};