'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Campuses', [
      {
        name: "Islamabad Campus",
        address: "Street # 09, Plot # 67 Sector H-8/4",
        city: 'Islamabad',
        country: 'Pakistan',
        zip_code: '44000'
      },
      {
        name: "Karachi Campus",
        address: "SZABIST 99, 100, 153, 154 and F79،, Block 5 Clifton",
        city: 'Karachi',
        country: 'Pakistan',
        zip_code: '75600'
      },
      {
        name: "Larkana Campus",
        address: "Sachal Colony Larkana",
        city: 'Larkana',
        country: 'Pakistan',
        zip_code: '77150'
      },
      {
        name: "Dubai Campus",
        address: "6th Floor, Block 10, Dubai International Academic City",
        city: 'Dubai',
        country: 'UAE',
        zip_code: '00000'
      },
    ],{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Campuses', null, {});
  }
};
