'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Genres', [
      {
        name: 'romance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'drama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'action',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'war',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'western',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'thriller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'disaster',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'horror',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'romantic comedy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'experimental',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'martial arts',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'crime',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'science fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'musical',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'slasher',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'comedy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'noir',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'documentary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'historical fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'monster',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'fantasy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'biographical',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'found footage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'psychological thriller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'historical film',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'satire',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'mockumentation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'dark comedy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'apocalyptic and post-apocalyptic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'melodrama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'teen',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'animation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'fantasy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'adventure',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'mafia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'cyberpunk',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'cowboy western',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'short',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'heist',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Genres', null, {});
  }
};
