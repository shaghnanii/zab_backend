'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: "admin",
      },
      {
        id: 2,
        name: "pm",
      },
      {
        id: 3,
        name: "supervisor",
      },
      {
        id: 4,
        name: "student",
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  }
};
