'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pannel.init({
    name: DataTypes.STRING,
    pm_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pannel',
  });
  Pannel.associate = models => {
    models.Pannel.belongsTo(models.Pm, {
      foreignKey: 'pm_id'
    })

    models.Pannel.hasMany(models.Group, {
      foreignKey: 'pannel_id'
    })

    models.Pannel.hasMany(models.Supervisor, {
      foreignKey: 'pannel_id'
    })

  }
  return Pannel;
};