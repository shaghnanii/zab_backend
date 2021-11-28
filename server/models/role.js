'use strict';
const {
  Model
} = require('sequelize');
// const models = require('./index');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: true,
  });

  Role.associate = models => {
    models.Role.hasOne(models.User, {
      foreignKey: 'role_id'
    })
  }

  return Role;
};