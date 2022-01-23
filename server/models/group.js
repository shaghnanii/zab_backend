'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Group.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    supervisor_id: DataTypes.INTEGER,
    fyp_id: DataTypes.INTEGER,
    pannel_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Group',
  });

  Group.associate = models => {
    models.Group.hasOne(models.Student, {
      foreignKey: 'group_id',
    })
  }
  return Group;
};