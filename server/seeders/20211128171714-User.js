'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: "admin@zab.com",
        password:
            "$2a$08$EwfXXUfdO0fdItc4/kpuGOWkb/N0pHqHajNOkv0eiclOevQXvM6v.",
        is_active: 1,
        reg_id: 1234560,
        password_status: 1,
        reset_code: null,
        image: "https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-1520x800.jpeg",
        role_id: 1,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
  }
};
