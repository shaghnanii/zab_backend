'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT
      },
      total_mark: {
        type: Sequelize.INTEGER
      },
      obtained_mark: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.ENUM(['1', '2'])
      },
      fyp_id: {
        type: Sequelize.INTEGER,
        isInt: true,
        allowNull: true,
        references: { model: "Fyps", key: "id" },
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
    await queryInterface.dropTable('Assessments');
  }
};