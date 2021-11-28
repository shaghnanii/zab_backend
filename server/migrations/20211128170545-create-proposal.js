'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proposals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.ENUM(['Web', 'Android', 'IOS', 'Web/Mobile', 'IOS/Android', 'Machine Learning', 'Unity', 'Game']),
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
    await queryInterface.dropTable('Proposals');
  }
};