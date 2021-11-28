'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      reg_id: {
        type: Sequelize.INTEGER
      },
      password_status: {
        type: Sequelize.BOOLEAN,
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      image: {
        type: Sequelize.STRING,
      },
      reset_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        isInt: true,
        references: { model: "Roles", key: "id" }
      },
      department_id: {
        type: Sequelize.INTEGER,
        isInt: true,
        allowNull: true,
        references: { model: "Departments", key: "id" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};