'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Users', [{
        role : "admin",
        fullname : "admin",
        email : "admin@gmail.com",
        password : "$2b$10$fgzj31uhYu2R7kecpmR43.aCqjrbVBD/tAhr3PYA9hRT5LLDUIKaC",
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
