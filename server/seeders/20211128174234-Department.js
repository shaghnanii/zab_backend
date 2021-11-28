'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Departments', [
      {
        name: "Bachelor of Science in Computer Science",
        code: 12,
        campus_id: 1,
      },
      {
        name: "Bachelor of Science in Software Engineering",
        code: 13,
        campus_id: 1,
      },
      {
        name: "Bachelor of Science in Information Technology",
        code: 14,
        campus_id: 1,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
